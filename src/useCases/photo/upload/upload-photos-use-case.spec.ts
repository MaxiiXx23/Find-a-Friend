import { describe, it, beforeEach, expect, vi, afterEach } from 'vitest'
import { Express } from 'express'
import fs from 'fs'

import { Levels, StagesAge } from '@prisma/client'
import { upload } from '@/config/upload'

import { InMemoryPhotosRepository } from '@/shared/http/repositories/photo/in-memory/in-memory-photos-repository'
import { InMemoryPetRepository } from '@/shared/http/repositories/pet/in-memory/in-memory-pet-repository'

import { UploadPhotosUseCase } from './UploadPhotosUseCase'

import { ResourceNotFoundError } from '@/useCases/errors/ResourceNotFoundError'
import { PathsNotSendedError } from '../errors/Paths-not-sended-error'
import { IStorageProvider } from '@/shared/container/providers/storageProvider/IStorageProvider'
import { LocalStorageProvider } from '@/shared/container/providers/storageProvider/implementations/LocalStorageProvider'

let photosRepository: InMemoryPhotosRepository
let petsRepository: InMemoryPetRepository
let storageProvider: IStorageProvider

let sut: UploadPhotosUseCase

// falta ajustes nesse teste feito fora do TDD
const stream = fs.createReadStream(
  `${upload.tmpFolder}/test/pingu-99cf2617-1e4f-43a4-af6d-7ba4621f2367.jpg`,
)

const buffer = Buffer.alloc(5)

const filenamePhoto: Express.Multer.File = {
  destination: upload.tmpFolder,
  fieldname: 'photos',
  filename: 'Foto-775b325d-1aba-4767-a766-e0c034eb513b.png',
  originalname: 'Foto-Dog.jpeg',
  mimetype: 'image/png',
  size: 256,
  path: 'path-file',
  encoding: '7bit',
  stream: stream.on('readable', () => {}),
  buffer,
}

const filenamesPhotoEmpty: Express.Multer.File[] = []

const filenamesPhoto: Express.Multer.File[] = [
  filenamePhoto,
  filenamePhoto,
  filenamePhoto,
  filenamePhoto,
]

describe('Upload Photos Use Case units test', () => {
  beforeEach(() => {
    photosRepository = new InMemoryPhotosRepository()
    petsRepository = new InMemoryPetRepository()
    storageProvider = new LocalStorageProvider()

    sut = new UploadPhotosUseCase(
      photosRepository,
      petsRepository,
      storageProvider,
    )
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('Should to be able create photos to a determined pet', async () => {
    const pet = await petsRepository.create({
      name: 'Suzi',
      description: `Suzy is a beautiful.`,
      level_energy: 5,
      size: Levels.SMALL,
      ambient: 'Ambiente amplo',
      age: StagesAge.YOUNG,
      independence: Levels.MEDIUM,
      org_id: 'id-org-01',
    })

    const { photosPet } = await sut.execute({
      filenames: filenamesPhoto,
      petId: pet.id,
    })

    expect(photosPet).toHaveLength(4)
  })

  it('Should not to be able create photos if pet not exists.', async () => {
    await petsRepository.create({
      name: 'Pepeu',
      description: `Pepeu is a beautiful.`,
      level_energy: 5,
      size: Levels.SMALL,
      ambient: 'Ambiente amplo',
      age: StagesAge.YOUNG,
      independence: Levels.MEDIUM,
      org_id: 'id-org-01',
    })

    expect(async () => {
      await sut.execute({
        filenames: filenamesPhoto,
        petId: 'pet-id-not-existing',
      })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('Should not to be able create photos if paths not sended.', async () => {
    const pet = await petsRepository.create({
      name: 'Pepeu',
      description: `Pepeu is a beautiful.`,
      level_energy: 5,
      size: Levels.SMALL,
      ambient: 'Ambiente amplo',
      age: StagesAge.YOUNG,
      independence: Levels.MEDIUM,
      org_id: 'id-org-01',
    })

    expect(async () => {
      await sut.execute({
        filenames: filenamesPhotoEmpty,
        petId: pet.id,
      })
    }).rejects.toBeInstanceOf(PathsNotSendedError)
  })
})

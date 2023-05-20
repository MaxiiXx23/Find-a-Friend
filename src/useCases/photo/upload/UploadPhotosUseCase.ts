import { Express } from 'express'

import { PhotoPet } from '@prisma/client'

import { IPetRepository } from '@/shared/http/repositories/pet/IPetRepository'
import { IPhotosRepository } from '@/shared/http/repositories/photo/IPhotosRepository'

import { ResourceNotFoundError } from '@/useCases/errors/ResourceNotFoundError'
import { PathsNotSendedError } from '../errors/Paths-not-sended-error'
import { IStorageProvider } from '@/shared/container/providers/storageProvider/IStorageProvider'

interface IRequest {
  filenames: Express.Multer.File[]
  petId: string
}

interface IResponse {
  photosPet: PhotoPet[]
}

export class UploadPhotosUseCase {
  constructor(
    private photosRepository: IPhotosRepository,
    private petsRepository: IPetRepository,
    private storageProvider: IStorageProvider,
  ) {}

  async execute({ filenames, petId }: IRequest): Promise<IResponse> {
    const hasPet = await this.petsRepository.findById(petId)

    if (!hasPet) {
      throw new ResourceNotFoundError()
    }

    if (filenames.length === 0) {
      throw new PathsNotSendedError()
    }

    const photosPet = await Promise.all(
      filenames.map(async (path) => {
        const photo = await this.photosRepository.create({
          path: path.filename,
          pet_id: petId,
        })

        this.storageProvider.save(photo.path, 'photos-pet')
        return photo
      }),
    )

    return {
      photosPet,
    }
  }
}

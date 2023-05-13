import { PrismaPhotosRepository } from '@/http/repositories/photo/prisma/PrismaPhotosRepository'
import { UploadPhotosUseCase } from '../UploadPhotosUseCase'
import { PrismaPetRepository } from '@/http/repositories/pet/prisma/PrismaPetRepository'
import { LocalStorageProvider } from '@/shared/container/providers/storageProvider/implementations/LocalStorageProvider'

export function makeUploadPhotosUseCase(): UploadPhotosUseCase {
  const photosPetRepository = new PrismaPhotosRepository()
  const petsRepository = new PrismaPetRepository()
  const storageProvider = new LocalStorageProvider()

  const uploadPhotosUseCase = new UploadPhotosUseCase(
    photosPetRepository,
    petsRepository,
    storageProvider,
  )

  return uploadPhotosUseCase
}

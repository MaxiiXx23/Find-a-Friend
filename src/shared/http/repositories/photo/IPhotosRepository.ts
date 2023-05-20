import { PhotoPet, Prisma } from '@prisma/client'

export interface IPhotosRepository {
  create(data: Prisma.PhotoPetUncheckedCreateInput): Promise<PhotoPet>
}

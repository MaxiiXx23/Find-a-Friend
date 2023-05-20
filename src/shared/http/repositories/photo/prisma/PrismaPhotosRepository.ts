import { Prisma, PhotoPet } from '@prisma/client'
import { IPhotosRepository } from '../IPhotosRepository'
import { prisma } from '@/lib/prisma'

export class PrismaPhotosRepository implements IPhotosRepository {
  async create({
    path,
    pet_id,
  }: Prisma.PhotoPetUncheckedCreateInput): Promise<PhotoPet> {
    const photo = await prisma.photoPet.create({
      data: {
        path,
        pet_id,
      },
    })

    return photo
  }
}

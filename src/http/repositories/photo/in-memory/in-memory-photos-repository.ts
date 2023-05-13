import { Prisma, PhotoPet } from '@prisma/client'
import { IPhotosRepository } from '../IPhotosRepository'
import { randomUUID } from 'crypto'

export class InMemoryPhotosRepository implements IPhotosRepository {
  public items: PhotoPet[] = []

  async create({
    path,
    pet_id,
  }: Prisma.PhotoPetUncheckedCreateInput): Promise<PhotoPet> {
    const photo: PhotoPet = {
      id: randomUUID(),
      path,
      pet_id,
    }

    this.items.push(photo)

    return photo
  }
}

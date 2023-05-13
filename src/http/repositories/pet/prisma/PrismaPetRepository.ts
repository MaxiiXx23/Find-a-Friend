import { prisma } from '@/lib/prisma'
import { Prisma, Pet } from '@prisma/client'

import { IFetchByQueriesProps, IPetRepository } from '../IPetRepository'

export class PrismaPetRepository implements IPetRepository {
  async create({
    name,
    description,
    level_energy,
    size,
    independence,
    age,
    ambient,
    org_id,
  }: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({
      data: {
        name,
        description,
        level_energy,
        size,
        independence,
        age,
        ambient,
        org_id,
      },
    })

    return pet
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    if (!pet) {
      return null
    }

    return pet
  }

  async delete(id: string): Promise<void> {
    await prisma.pet.delete({
      where: {
        id,
      },
    })
  }

  async fetchByQueries({
    age,
    idOrg,
    independence,
    levelEnergy,
    size,
  }: IFetchByQueriesProps): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        org_id: idOrg,
        OR: [
          {
            age: {
              equals: age,
            },
            independence: {
              equals: independence,
            },
            level_energy: {
              equals: levelEnergy,
            },
            size: {
              equals: size,
            },
          },
        ],
      },
    })

    return pets
  }
}

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
      include: {
        requirement: {
          select: {
            id: true,
            description: true,
          },
        },
        photoPet: {
          select: {
            id: true,
            path: true,
          },
        },
        org: {
          select: {
            phone: true,
          },
        },
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
    page,
  }: IFetchByQueriesProps): Promise<Pet[]> {
    const take = 20
    const skip = (page - 1) * 20

    const pets = await prisma.pet.findMany({
      where: {
        OR: [
          {
            org_id: {
              equals: idOrg,
            },
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
      take,
      skip,
    })

    return pets
  }
}

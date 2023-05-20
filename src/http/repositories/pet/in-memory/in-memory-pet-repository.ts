import { randomUUID } from 'crypto'
import { Prisma, Pet } from '@prisma/client'
import { IFetchByQueriesProps, IPetRepository } from '../IPetRepository'
import { filterQueries } from '@/utils/tests/filterQueries'

export class InMemoryPetRepository implements IPetRepository {
  public items: Pet[] = []

  async create({
    id,
    name,
    description,
    level_energy,
    size,
    independence,
    ambient,
    age,
    org_id,
  }: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet: Pet = {
      id: id ?? randomUUID(),
      name,
      description,
      level_energy,
      size,
      independence,
      ambient,
      age,
      org_id,
      created_at: new Date(),
    }

    this.items.push(pet)
    return pet
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async delete(id: string): Promise<void> {
    const petIndex = this.items.findIndex((item) => item.id === id)

    this.items.splice(petIndex, 1)
  }

  async fetchByQueries({
    idOrg,
    age,
    independence,
    levelEnergy,
    size,
    page,
  }: IFetchByQueriesProps): Promise<Pet[]> {
    const petsOrg = this.items.filter((pet) => pet.org_id === idOrg)

    const pets = filterQueries({
      petsOrg,
      age,
      independence,
      levelEnergy,
      size,
    })

    const petsPaginated = [...pets!.slice((page - 1) * 20, page * 20)]

    return petsPaginated
  }
}

import { describe, it, expect, beforeEach } from 'vitest'
import { Levels } from '@prisma/client'

import { InMemoryPetRepository } from '@/shared/http/repositories/pet/in-memory/in-memory-pet-repository'
import { DeletePetUseCase } from './DeletePetUseCase'

import { ResourceNotFoundError } from '@/useCases/errors/ResourceNotFoundError'

let petRepository: InMemoryPetRepository
let sut: DeletePetUseCase

describe('Delete Pet Use Case Test Unit', () => {
  beforeEach(() => {
    petRepository = new InMemoryPetRepository()
    sut = new DeletePetUseCase(petRepository)
  })

  it('Should to be able delete a Pet', async () => {
    const newPet = await petRepository.create({
      name: 'Suzi',
      description: `Suzy is a beautiful.`,
      level_energy: 5,
      size: Levels.SMALL,
      ambient: 'Ambiente amplo',
      independence: Levels.MEDIUM,
      org_id: 'org-id',
    })

    await sut.execute({
      petId: newPet.id,
    })

    expect(petRepository.items).toEqual([])
  })

  it('Should not to be able delete a Pet if wrong pet id', async () => {
    await petRepository.create({
      name: 'Suzi',
      description: `Suzy is a beautiful.`,
      level_energy: 5,
      size: Levels.SMALL,
      ambient: 'Ambiente amplo',
      independence: Levels.MEDIUM,
      org_id: 'org-id',
    })

    expect(async () => {
      await sut.execute({
        petId: 'wrong-pet-id',
      })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})

import { describe, it, expect, beforeEach } from 'vitest'
import { Levels } from '@prisma/client'

import { InMemoryRequirementRepository } from '@/shared/http/repositories/requirement/in-memory/in-memory-requirement-repository'
import { CreateRequirementUseCase } from './CreateRequirementUseCase'
import { InMemoryPetRepository } from '@/shared/http/repositories/pet/in-memory/in-memory-pet-repository'
import { PetNotFoundError } from './errors/PetNotFoundError'

let requirementRepository: InMemoryRequirementRepository
let petRepository: InMemoryPetRepository
let sut: CreateRequirementUseCase

describe('Create Requirement Use Case Test Unit', () => {
  beforeEach(() => {
    requirementRepository = new InMemoryRequirementRepository()
    petRepository = new InMemoryPetRepository()
    sut = new CreateRequirementUseCase(requirementRepository, petRepository)
  })

  it('Should to be able create requirements', async () => {
    const pet = await petRepository.create({
      name: 'Suzi',
      description: `Suzy is a beautiful.`,
      level_energy: 5,
      size: Levels.SMALL,
      age: 'PUPPY',
      ambient: 'Ambiente amplo',
      independence: Levels.MEDIUM,
      org_id: 'org-id',
    })

    const requirementsDescription = [
      'Local grande para o animal correr e brincar.',
      'Proibido apartamento',
    ]

    const { requirements } = await sut.execute({
      requirementsDescription,
      petId: pet.id,
    })

    expect(requirements).toEqual([
      {
        id: expect.any(String),
        description: expect.any(String),
        pet_id: expect.any(String),
      },
      {
        id: expect.any(String),
        description: expect.any(String),
        pet_id: expect.any(String),
      },
    ])
  })

  it('Should not to be able create a requirement if pet_id not exists.', async () => {
    await petRepository.create({
      name: 'Suzi',
      description: `Suzy is a beautiful.`,
      level_energy: 5,
      size: Levels.SMALL,
      ambient: 'Ambiente amplo',
      independence: Levels.MEDIUM,
      org_id: 'org-id',
      age: 'PUPPY',
    })

    const requirementsDescription = [
      'Local grande para o animal correr e brincar.',
      'Proibido apartamento',
    ]

    expect(async () => {
      await sut.execute({
        requirementsDescription,
        petId: 'wrong-id-pet',
      })
    }).rejects.toBeInstanceOf(PetNotFoundError)
  })
})

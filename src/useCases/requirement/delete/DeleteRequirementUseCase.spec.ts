import { describe, it, expect, beforeEach } from 'vitest'

import { InMemoryRequirementRepository } from '@/shared/http/repositories/requirement/in-memory/in-memory-requirement-repository'
import { DeleteRequirementUseCase } from './DeleteRequirementUseCase'

import { RequirementNotFoundError } from './errors/Requirement-not-found-error'

let requirementRepository: InMemoryRequirementRepository
let sut: DeleteRequirementUseCase

describe('Delete Requirement Use Case - Test Unit', () => {
  beforeEach(() => {
    requirementRepository = new InMemoryRequirementRepository()
    sut = new DeleteRequirementUseCase(requirementRepository)
  })

  it('Should to be able delete requiment by id', async () => {
    await requirementRepository.create({
      description: 'Local grande para o animal correr e brincar.',
      pet_id: 'pet-id-01',
    })

    const requirement = await requirementRepository.create({
      description: 'Proibido apartamento.',
      pet_id: 'pet-id-01',
    })

    const { requirementDeleted } = await sut.execute({
      idRequirement: requirement.id,
    })

    expect(requirementDeleted).toHaveProperty('id')
    expect(requirementRepository.items).toHaveLength(1)
  })

  it('Should not to be able delete requiment if id to be wrong', async () => {
    await requirementRepository.create({
      description: 'Local grande para o animal correr e brincar.',
      pet_id: 'pet-id-01',
    })

    await requirementRepository.create({
      description: 'Proibido apartamento.',
      pet_id: 'pet-id-01',
    })

    const idWrong = 'id-requirement-wrong'

    expect(async () => {
      await sut.execute({
        idRequirement: idWrong,
      })
    }).rejects.toBeInstanceOf(RequirementNotFoundError)

    expect(requirementRepository.items).toHaveLength(2)
  })
})

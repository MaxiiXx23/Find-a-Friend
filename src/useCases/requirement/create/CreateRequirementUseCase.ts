import { Requirement } from '@prisma/client'

import { IRequirementRepository } from '@/shared/http/repositories/requirement/IRequirementRepository'
import { IPetRepository } from '@/shared/http/repositories/pet/IPetRepository'
import { PetNotFoundError } from './errors/PetNotFoundError'

interface IRequest {
  requirementsDescription: string[]
  petId: string
}

interface IResponse {
  requirements: Requirement[]
}

export class CreateRequirementUseCase {
  constructor(
    private requirementRepository: IRequirementRepository,
    private petRepository: IPetRepository,
  ) {}

  async execute({
    requirementsDescription,
    petId,
  }: IRequest): Promise<IResponse> {
    const pet = await this.petRepository.findById(petId)

    if (!pet) {
      throw new PetNotFoundError()
    }

    const requirements = await Promise.all(
      requirementsDescription.map(async (description) => {
        const requirement = await this.requirementRepository.create({
          description,
          pet_id: petId,
        })

        return requirement
      }),
    )

    return {
      requirements,
    }
  }
}

import { Requirement } from '@prisma/client'

import { IRequirementRepository } from '@/shared/http/repositories/requirement/IRequirementRepository'
import { RequirementNotFoundError } from './errors/Requirement-not-found-error'

interface IRequest {
  idRequirement: string
}

interface IResponse {
  requirementDeleted: Requirement
}

export class DeleteRequirementUseCase {
  constructor(private requirementRepository: IRequirementRepository) {}

  async execute({ idRequirement }: IRequest): Promise<IResponse> {
    const requirementDeleted = await this.requirementRepository.delete(
      idRequirement,
    )

    if (!requirementDeleted) {
      throw new RequirementNotFoundError()
    }

    return {
      requirementDeleted,
    }
  }
}

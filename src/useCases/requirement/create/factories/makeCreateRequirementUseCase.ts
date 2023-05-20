import { PrismaRequirementRepository } from '@/shared/http/repositories/requirement/prisma/PrismaRequirementRepository'
import { CreateRequirementUseCase } from '../CreateRequirementUseCase'
import { PrismaPetRepository } from '@/shared/http/repositories/pet/prisma/PrismaPetRepository'

export function makeCreateRequirementUseCase(): CreateRequirementUseCase {
  const requirementRepository = new PrismaRequirementRepository()
  const petRepository = new PrismaPetRepository()

  const createRequirementUseCase = new CreateRequirementUseCase(
    requirementRepository,
    petRepository,
  )

  return createRequirementUseCase
}

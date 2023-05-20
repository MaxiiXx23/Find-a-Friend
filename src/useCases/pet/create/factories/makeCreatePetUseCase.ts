import { PrismaOrganizationRepository } from '@/shared/http/repositories/organization/prisma/PrismaOrganizationRepository'
import { CreatePetUseCase } from '../CreatePetUseCase'
import { PrismaPetRepository } from '@/shared/http/repositories/pet/prisma/PrismaPetRepository'

export function makeCreatePetUseCase() {
  const organizationRepository = new PrismaOrganizationRepository()
  const petRepository = new PrismaPetRepository()

  const createPetUseCase = new CreatePetUseCase(
    organizationRepository,
    petRepository,
  )

  return createPetUseCase
}

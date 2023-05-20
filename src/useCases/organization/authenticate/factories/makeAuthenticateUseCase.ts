import { PrismaOrganizationRepository } from '@/shared/http/repositories/organization/prisma/PrismaOrganizationRepository'
import { AuthenticateUseCase } from '../AuthenticateUseCase'

export function makeAuthenticateUseCase() {
  const organizationsRepository = new PrismaOrganizationRepository()

  const authenticateUseCase = new AuthenticateUseCase(organizationsRepository)

  return authenticateUseCase
}

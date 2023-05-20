import { PrismaOrganizationRepository } from '@/shared/http/repositories/organization/prisma/PrismaOrganizationRepository'
import { RegisterUseCase } from '../RegisterUseCase'
import { PrismaAddressRepository } from '@/shared/http/repositories/address/prisma/PrismaAddressRepository'

export function makeRegisterUseCase() {
  const organizationRespository = new PrismaOrganizationRepository()
  const addressRepository = new PrismaAddressRepository()

  const registerUseCase = new RegisterUseCase(
    organizationRespository,
    addressRepository,
  )

  return registerUseCase
}

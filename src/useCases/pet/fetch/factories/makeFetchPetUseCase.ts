import { PrismaPetRepository } from '@/http/repositories/pet/prisma/PrismaPetRepository'
import { FetchPetUseCase } from '../FetchPetUseCase'
import { PrismaAddressRepository } from '@/http/repositories/address/prisma/PrismaAddressRepository'

export function makeFetchPetUseCase(): FetchPetUseCase {
  const petRepository = new PrismaPetRepository()
  const addressRepository = new PrismaAddressRepository()

  const fetchPetUseCase = new FetchPetUseCase(petRepository, addressRepository)

  return fetchPetUseCase
}

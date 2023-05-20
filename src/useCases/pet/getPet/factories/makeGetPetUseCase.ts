import { PrismaPetRepository } from '@/shared/http/repositories/pet/prisma/PrismaPetRepository'
import { GetPetUseCase } from '../GetPetUseCase'

export function makeGetPetUseCase(): GetPetUseCase {
  const petRepository = new PrismaPetRepository()

  const getPetUseCase = new GetPetUseCase(petRepository)

  return getPetUseCase
}

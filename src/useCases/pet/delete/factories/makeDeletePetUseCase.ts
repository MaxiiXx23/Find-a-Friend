import { PrismaPetRepository } from '@/http/repositories/pet/prisma/PrismaPetRepository'
import { DeletePetUseCase } from '../DeletePetUseCase'

export function makeDeletePetUseCase(): DeletePetUseCase {
  const petRepository = new PrismaPetRepository()

  const deletePetUseCase = new DeletePetUseCase(petRepository)

  return deletePetUseCase
}

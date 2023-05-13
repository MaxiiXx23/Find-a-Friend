import { IPetRepository } from '@/http/repositories/pet/IPetRepository'
import { PetNotFoundError } from '@/useCases/requirement/create/errors/PetNotFoundError'
import { Pet } from '@prisma/client'

interface IRequest {
  petId: string
}

interface IResponse {
  pet: Pet
}

export class GetPetUseCase {
  constructor(private petRepository: IPetRepository) {}

  async execute({ petId }: IRequest): Promise<IResponse> {
    const pet = await this.petRepository.findById(petId)

    if (!pet) {
      throw new PetNotFoundError()
    }

    return {
      pet,
    }
  }
}

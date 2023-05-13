import { IPetRepository } from '@/http/repositories/pet/IPetRepository'
import { ResourceNotFoundError } from '@/useCases/errors/ResourceNotFoundError'

interface IRequest {
  petId: string
}

export class DeletePetUseCase {
  constructor(private petRepository: IPetRepository) {}

  async execute({ petId }: IRequest): Promise<void> {
    const hasPet = await this.petRepository.findById(petId)

    if (hasPet === null) {
      throw new ResourceNotFoundError()
    }

    await this.petRepository.delete(petId)
  }
}

import { Pet, Levels, StagesAge } from '@prisma/client'

import { IOrganizationRepository } from '@/http/repositories/organization/IOrganizationRepository'
import { IPetRepository } from '@/http/repositories/pet/IPetRepository'

import { OrganizationNotFoundError } from './errors/organization-not-found-error'

interface IRequest {
  name: string
  description: string
  level_energy: number
  size: Levels
  independence: Levels
  age: StagesAge
  ambient: string
  org_id: string
}

interface IResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private organizationRepository: IOrganizationRepository,
    private petRepository: IPetRepository,
  ) {}

  async execute({
    name,
    description,
    level_energy,
    size,
    independence,
    age,
    ambient,
    org_id,
  }: IRequest): Promise<IResponse> {
    const org = await this.organizationRepository.findById(org_id)

    if (!org) {
      throw new OrganizationNotFoundError()
    }

    const pet = await this.petRepository.create({
      name,
      description,
      level_energy,
      size,
      independence,
      ambient,
      age,
      org_id,
    })

    return {
      pet,
    }
  }
}

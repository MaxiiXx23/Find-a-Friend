import { Levels, Pet, StagesAge } from '@prisma/client'

import { IPetRepository } from '@/http/repositories/pet/IPetRepository'
import { IAddressRepository } from '@/http/repositories/address/IAddressRepository'

import { PetsNotFoundByStateError } from './errors/Pets-not-found-by-state-error'

interface IRequest {
  state: string
  city: string
  age: StagesAge | undefined
  levelEnergy: number | undefined
  size: Levels | undefined
  independence: Levels | undefined
  page: number
}

interface IResponse {
  pets: Pet[]
}

export class FetchPetUseCase {
  constructor(
    private petsRepository: IPetRepository,
    private addressRepository: IAddressRepository,
  ) {}

  async execute({
    city,
    state,
    age,
    levelEnergy,
    size,
    independence,
    page,
  }: IRequest): Promise<IResponse> {
    let pets: Pet[] = []

    const addresses = await this.addressRepository.findByStateAndCity({
      city,
      state,
    })

    if (addresses.length === 0) {
      throw new PetsNotFoundByStateError()
    }

    const idOrgs = addresses.map((address) => {
      return address.org_id
    })

    await Promise.all(
      idOrgs.map(async (id) => {
        const pet = await this.petsRepository.fetchByQueries({
          idOrg: id,
          age,
          levelEnergy,
          size,
          independence,
          page,
        })

        if (pet) {
          pets = [...pets, ...pet]
        }
      }),
    )

    return {
      pets,
    }
  }
}

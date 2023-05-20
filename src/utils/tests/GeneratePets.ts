import { Levels, StagesAge } from '@prisma/client'

import { InMemoryAddressRepository } from '@/http/repositories/address/in-memory/in-memory-address-repository'
import { InMemoryOrganizationRepository } from '@/http/repositories/organization/in-memory/in-memory-organization-repository'
import { InMemoryPetRepository } from '@/http/repositories/pet/in-memory/in-memory-pet-repository'

import { RegisterUseCase } from '@/useCases/organization/register/RegisterUseCase'

let registerUseCase: RegisterUseCase

export class GeneratePets {
  constructor(
    private petsRepository: InMemoryPetRepository,
    private addressRepository: InMemoryAddressRepository,
    private organizationRepository: InMemoryOrganizationRepository,
  ) {}

  async generateEqualsPets() {
    registerUseCase = new RegisterUseCase(
      this.organizationRepository,
      this.addressRepository,
    )

    const { organization } = await registerUseCase.execute({
      name_responsible: 'John Doe',
      email: 'organizationjohn@testing.com',
      phone: '+55 31 97777-0000',
      password: '123456',
      cep: '59290-000',
      street: 'Av. Uberaba',
      number: '40',
      complement: '',
      district: 'Jardim Gonçavel',
      city: 'Campinas',
      state: 'sp',
    })

    for (let i = 1; i <= 21; i++) {
      await this.petsRepository.create({
        name: `Suzi-${i}`,
        description: `Description Dog`,
        level_energy: 5,
        size: Levels.SMALL,
        ambient: 'Ambiente amplo',
        independence: Levels.SMALL,
        age: StagesAge.SENIOR,
        org_id: organization.id,
      })
    }
  }
}

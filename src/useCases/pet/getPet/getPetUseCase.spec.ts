import { describe, it, expect, beforeEach } from 'vitest'

import { Levels, StagesAge } from '@prisma/client'

import { GetPetUseCase } from './GetPetUseCase'
import { CreatePetUseCase } from '../create/CreatePetUseCase'
import { RegisterUseCase } from '@/useCases/organization/register/RegisterUseCase'

import { InMemoryPetRepository } from '@/http/repositories/pet/in-memory/in-memory-pet-repository'
import { InMemoryOrganizationRepository } from '@/http/repositories/organization/in-memory/in-memory-organization-repository'
import { InMemoryAddressRepository } from '@/http/repositories/address/in-memory/in-memory-address-repository'

import { PetNotFoundError } from '@/useCases/requirement/create/errors/PetNotFoundError'

let petRepository: InMemoryPetRepository
let organizationRepository: InMemoryOrganizationRepository
let addressRepository: InMemoryAddressRepository

let registerOrgUseCase: RegisterUseCase
let createPetUseCase: CreatePetUseCase

let sut: GetPetUseCase

describe('Get Pet Use Case - Test Unit', () => {
  beforeEach(() => {
    petRepository = new InMemoryPetRepository()
    organizationRepository = new InMemoryOrganizationRepository()
    addressRepository = new InMemoryAddressRepository()

    registerOrgUseCase = new RegisterUseCase(
      organizationRepository,
      addressRepository,
    )

    createPetUseCase = new CreatePetUseCase(
      organizationRepository,
      petRepository,
    )

    sut = new GetPetUseCase(petRepository)
  })

  it('Should to be able get pet by petId', async () => {
    const { organization } = await registerOrgUseCase.execute({
      name_responsible: 'John Doe',
      email: 'organizationjohndoe@testing.com',
      phone: '+55 31 97777-0000',
      password: '123456',
      cep: '59290-000',
      street: 'Av. Uberaba',
      number: '40',
      complement: '',
      district: 'Jardim Gonçavel',
      city: 'Itaquaquecetuba',
      state: 'sp',
    })

    const { pet: petCreated } = await createPetUseCase.execute({
      name: 'Suzi',
      description: `Suzy is a beautiful.`,
      level_energy: 5,
      size: Levels.SMALL,
      ambient: 'Ambiente amplo',
      age: StagesAge.YOUNG,
      independence: Levels.MEDIUM,
      org_id: organization.id,
    })

    const { pet } = await sut.execute({
      petId: petCreated.id,
    })

    expect(pet).toHaveProperty('id')
    expect(pet).toHaveProperty('name')
  })

  it('Should not to be able get pet if petId is wrong', async () => {
    const { organization } = await registerOrgUseCase.execute({
      name_responsible: 'John Doe',
      email: 'organizationjohndoe@testing.com',
      phone: '+55 31 97777-0000',
      password: '123456',
      cep: '59290-000',
      street: 'Av. Uberaba',
      number: '40',
      complement: '',
      district: 'Jardim Gonçavel',
      city: 'Itaquaquecetuba',
      state: 'sp',
    })

    await createPetUseCase.execute({
      name: 'Suzi',
      description: `Suzy is a beautiful.`,
      level_energy: 5,
      size: Levels.SMALL,
      ambient: 'Ambiente amplo',
      age: StagesAge.YOUNG,
      independence: Levels.MEDIUM,
      org_id: organization.id,
    })

    expect(async () => {
      await sut.execute({
        petId: 'wrong-pet-id',
      })
    }).rejects.toBeInstanceOf(PetNotFoundError)
  })
})

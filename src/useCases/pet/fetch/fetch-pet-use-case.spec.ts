import { describe, it, expect, beforeEach } from 'vitest'

import { Levels, StagesAge } from '@prisma/client'

import { InMemoryPetRepository } from '@/http/repositories/pet/in-memory/in-memory-pet-repository'
import { InMemoryAddressRepository } from '@/http/repositories/address/in-memory/in-memory-address-repository'
import { InMemoryOrganizationRepository } from '@/http/repositories/organization/in-memory/in-memory-organization-repository'

import { RegisterUseCase } from '@/useCases/organization/register/RegisterUseCase'
import { FetchPetUseCase } from './FetchPetUseCase'

import { PetsNotFoundByStateError } from './errors/Pets-not-found-by-state-error'

import { GeneratePets } from '@/utils/tests/GeneratePets'

let petsRepository: InMemoryPetRepository
let addressRepository: InMemoryAddressRepository
let organizationRepository: InMemoryOrganizationRepository

let registerUseCase: RegisterUseCase

let sut: FetchPetUseCase

let generatePets: GeneratePets

// queries

describe('Fetch Pet Use Case test unit', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetRepository()
    addressRepository = new InMemoryAddressRepository()

    organizationRepository = new InMemoryOrganizationRepository()

    registerUseCase = new RegisterUseCase(
      organizationRepository,
      addressRepository,
    )

    sut = new FetchPetUseCase(petsRepository, addressRepository)
    generatePets = new GeneratePets(
      petsRepository,
      addressRepository,
      organizationRepository,
    )
  })

  it('Should to be able Fetch Pets by queries', async () => {
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

    const { organization: organization2 } = await registerUseCase.execute({
      name_responsible: 'John Doe 2',
      email: 'organizationpetmax@testing.com',
      phone: '+55 31 97777-0000',
      password: '123456',
      cep: '59290-000',
      street: 'Estr. dos Índios',
      number: '60',
      complement: '',
      district: 'Jardim Alpes de Itaqua',
      city: 'Rio de Janeiro',
      state: 'rj',
    })

    await petsRepository.create({
      name: 'Suzi',
      description: `Description Dog`,
      level_energy: 5,
      size: Levels.SMALL,
      ambient: 'Ambiente amplo',
      independence: Levels.MEDIUM,
      age: StagesAge.YOUNG,
      org_id: organization.id,
    })

    await petsRepository.create({
      name: 'Pepeu',
      description: `Description Dog 2`,
      level_energy: 3,
      size: Levels.SMALL,
      ambient: 'Ambiente amplo',
      independence: Levels.BIG,
      age: StagesAge.ADULT,
      org_id: organization.id,
    })

    await petsRepository.create({
      name: 'Gatuno',
      description: `Description Dog 3`,
      level_energy: 5,
      size: Levels.MEDIUM,
      ambient: 'Ambiente pequeno',
      independence: Levels.BIG,
      age: StagesAge.ADULT,
      org_id: organization2.id,
    })

    const { pets } = await sut.execute({
      city: 'Campinas',
      state: 'sp',
      age: undefined,
      independence: undefined,
      levelEnergy: undefined,
      size: undefined,
      page: 1,
    })

    expect(pets).toHaveLength(2)
  })

  it('Should not to be able Fetch Pets by queries if state not found.', async () => {
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

    const { organization: organization2 } = await registerUseCase.execute({
      name_responsible: 'John Doe 2',
      email: 'organizationpetmax@testing.com',
      phone: '+55 31 97777-0000',
      password: '123456',
      cep: '59290-000',
      street: 'Estr. dos Índios',
      number: '60',
      complement: '',
      district: 'Jardim Alpes de Itaqua',
      city: 'Arujá',
      state: 'rj',
    })

    await petsRepository.create({
      name: 'Suzi',
      description: `Description Dog`,
      level_energy: 5,
      size: Levels.SMALL,
      ambient: 'Ambiente amplo',
      independence: Levels.MEDIUM,
      age: StagesAge.YOUNG,
      org_id: organization.id,
    })

    await petsRepository.create({
      name: 'Pepeu',
      description: `Description Dog 2`,
      level_energy: 3,
      size: Levels.SMALL,
      ambient: 'Ambiente amplo',
      independence: Levels.BIG,
      age: StagesAge.ADULT,
      org_id: organization.id,
    })

    await petsRepository.create({
      name: 'Gatuno',
      description: `Description Dog 3`,
      level_energy: 5,
      size: Levels.MEDIUM,
      ambient: 'Ambiente pequeno',
      independence: Levels.BIG,
      age: StagesAge.ADULT,
      org_id: organization2.id,
    })

    expect(async () => {
      await sut.execute({
        city: 'Campinas',
        state: 'bh',
        age: undefined,
        independence: undefined,
        levelEnergy: undefined,
        size: undefined,
        page: 1,
      })
    }).rejects.toBeInstanceOf(PetsNotFoundByStateError)
  })

  it('Should to be able Fetch Pets just for query state', async () => {
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

    const { organization: organization2 } = await registerUseCase.execute({
      name_responsible: 'John Doe 2',
      email: 'organizationpetmax@testing.com',
      phone: '+55 31 97777-0000',
      password: '123456',
      cep: '59290-000',
      street: 'Estr. dos Índios',
      number: '60',
      complement: '',
      district: 'Jardim Alpes de Itaqua',
      city: 'Salvador',
      state: 'bh',
    })

    await petsRepository.create({
      name: 'Suzi',
      description: `Description Dog`,
      level_energy: 5,
      size: Levels.SMALL,
      ambient: 'Ambiente amplo',
      independence: Levels.MEDIUM,
      age: StagesAge.YOUNG,
      org_id: organization.id,
    })

    await petsRepository.create({
      name: 'Pepeu',
      description: `Description Dog 2`,
      level_energy: 3,
      size: Levels.SMALL,
      ambient: 'Ambiente amplo',
      independence: Levels.BIG,
      age: StagesAge.ADULT,
      org_id: organization.id,
    })

    await petsRepository.create({
      name: 'Gatuno',
      description: `Description Dog 3`,
      level_energy: 5,
      size: Levels.MEDIUM,
      ambient: 'Ambiente pequeno',
      independence: Levels.BIG,
      age: StagesAge.ADULT,
      org_id: organization2.id,
    })

    const { pets } = await sut.execute({
      city: '',
      state: 'sp',
      age: undefined,
      independence: undefined,
      levelEnergy: undefined,
      size: undefined,
      page: 1,
    })

    expect(pets).toHaveLength(2)
  })

  it('Should to be able Fetch Pets by query age', async () => {
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

    const { organization: organization2 } = await registerUseCase.execute({
      name_responsible: 'John Doe 2',
      email: 'organizationpetmax@testing.com',
      phone: '+55 31 97777-0000',
      password: '123456',
      cep: '59290-000',
      street: 'Estr. dos Índios',
      number: '60',
      complement: '',
      district: 'Jardim Alpes de Itaqua',
      city: 'Rio de Janeiro',
      state: 'rj',
    })

    await petsRepository.create({
      name: 'Suzi',
      description: `Description Dog`,
      level_energy: 5,
      size: Levels.SMALL,
      ambient: 'Ambiente amplo',
      independence: Levels.MEDIUM,
      age: StagesAge.YOUNG,
      org_id: organization.id,
    })

    await petsRepository.create({
      name: 'Pepeu',
      description: `Description Dog 2`,
      level_energy: 3,
      size: Levels.SMALL,
      ambient: 'Ambiente amplo',
      independence: Levels.BIG,
      age: StagesAge.ADULT,
      org_id: organization.id,
    })

    await petsRepository.create({
      name: 'Gatuno',
      description: `Description Dog 3`,
      level_energy: 5,
      size: Levels.MEDIUM,
      ambient: 'Ambiente pequeno',
      independence: Levels.BIG,
      age: StagesAge.ADULT,
      org_id: organization2.id,
    })

    const { pets } = await sut.execute({
      city: 'Campinas',
      state: 'sp',
      age: 'YOUNG',
      independence: undefined,
      levelEnergy: undefined,
      size: undefined,
      page: 1,
    })

    expect(pets).toHaveLength(1)
  })

  it('Should to be able Fetch Pets by query Level Energy', async () => {
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

    const { organization: organization2 } = await registerUseCase.execute({
      name_responsible: 'John Doe 2',
      email: 'organizationpetmax@testing.com',
      phone: '+55 31 97777-0000',
      password: '123456',
      cep: '59290-000',
      street: 'Estr. dos Índios',
      number: '60',
      complement: '',
      district: 'Jardim Alpes de Itaqua',
      city: 'Rio de Janeiro',
      state: 'rj',
    })

    await petsRepository.create({
      name: 'Suzi',
      description: `Description Dog`,
      level_energy: 5,
      size: Levels.SMALL,
      ambient: 'Ambiente amplo',
      independence: Levels.MEDIUM,
      age: StagesAge.YOUNG,
      org_id: organization.id,
    })

    await petsRepository.create({
      name: 'Pepeu',
      description: `Description Dog 2`,
      level_energy: 5,
      size: Levels.SMALL,
      ambient: 'Ambiente amplo',
      independence: Levels.BIG,
      age: StagesAge.ADULT,
      org_id: organization2.id,
    })

    await petsRepository.create({
      name: 'Gatuno',
      description: `Description Dog 3`,
      level_energy: 5,
      size: Levels.MEDIUM,
      ambient: 'Ambiente pequeno',
      independence: Levels.BIG,
      age: StagesAge.ADULT,
      org_id: organization.id,
    })

    const { pets } = await sut.execute({
      city: '',
      state: 'sp',
      levelEnergy: 5,
      age: undefined,
      independence: undefined,
      size: undefined,
      page: 1,
    })

    expect(pets).toHaveLength(2)
  })

  it('Should to be able Fetch Pets by query size', async () => {
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

    const { organization: organization2 } = await registerUseCase.execute({
      name_responsible: 'John Doe 2',
      email: 'organizationpetmax@testing.com',
      phone: '+55 31 97777-0000',
      password: '123456',
      cep: '59290-000',
      street: 'Estr. dos Índios',
      number: '60',
      complement: '',
      district: 'Jardim Alpes de Itaqua',
      city: 'Rio de Janeiro',
      state: 'rj',
    })

    await petsRepository.create({
      name: 'Suzi',
      description: `Description Dog`,
      level_energy: 5,
      size: Levels.SMALL,
      ambient: 'Ambiente amplo',
      independence: Levels.MEDIUM,
      age: StagesAge.YOUNG,
      org_id: organization.id,
    })

    await petsRepository.create({
      name: 'Pepeu',
      description: `Description Dog 2`,
      level_energy: 3,
      size: Levels.SMALL,
      ambient: 'Ambiente amplo',
      independence: Levels.BIG,
      age: StagesAge.ADULT,
      org_id: organization.id,
    })

    await petsRepository.create({
      name: 'Gatuno',
      description: `Description Dog 3`,
      level_energy: 5,
      size: Levels.MEDIUM,
      ambient: 'Ambiente pequeno',
      independence: Levels.BIG,
      age: StagesAge.ADULT,
      org_id: organization2.id,
    })

    const { pets } = await sut.execute({
      city: 'Campinas',
      state: 'sp',
      size: 'SMALL',
      age: undefined,
      independence: undefined,
      levelEnergy: undefined,
      page: 1,
    })

    expect(pets).toHaveLength(2)
  })

  it('Should to be able Fetch Pets by query independency', async () => {
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

    await petsRepository.create({
      name: 'Suzi',
      description: `Description Dog`,
      level_energy: 5,
      size: Levels.SMALL,
      ambient: 'Ambiente amplo',
      independence: Levels.MEDIUM,
      age: StagesAge.YOUNG,
      org_id: organization.id,
    })

    await petsRepository.create({
      name: 'Pepeu',
      description: `Description Dog 2`,
      level_energy: 3,
      size: Levels.SMALL,
      ambient: 'Ambiente amplo',
      independence: Levels.SMALL,
      age: StagesAge.ADULT,
      org_id: organization.id,
    })

    await petsRepository.create({
      name: 'Gatuno',
      description: `Description Dog 3`,
      level_energy: 5,
      size: Levels.MEDIUM,
      ambient: 'Ambiente pequeno',
      independence: Levels.BIG,
      age: StagesAge.ADULT,
      org_id: organization.id,
    })

    const { pets } = await sut.execute({
      city: '',
      state: 'sp',
      independence: 'MEDIUM',
      age: undefined,
      levelEnergy: undefined,
      size: undefined,
      page: 1,
    })

    expect(pets).toHaveLength(1)
  })

  it('Should to be able Fetch Pets by with all queries', async () => {
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

    const { organization: organization2 } = await registerUseCase.execute({
      name_responsible: 'John Doe 2',
      email: 'organizationpetmax@testing.com',
      phone: '+55 31 97777-0000',
      password: '123456',
      cep: '59290-000',
      street: 'Estr. dos Índios',
      number: '60',
      complement: '',
      district: 'Jardim Alpes de Itaqua',
      city: 'Rio de Janeiro',
      state: 'rj',
    })

    await petsRepository.create({
      name: 'Suzi',
      description: `Description Dog`,
      level_energy: 5,
      size: Levels.SMALL,
      ambient: 'Ambiente pequeno',
      independence: Levels.SMALL,
      age: StagesAge.SENIOR,
      org_id: organization.id,
    })

    await petsRepository.create({
      name: 'Pepeu',
      description: `Description Dog 2`,
      level_energy: 5,
      size: Levels.SMALL,
      ambient: 'Ambiente amplo',
      independence: Levels.SMALL,
      age: StagesAge.ADULT,
      org_id: organization.id,
    })

    await petsRepository.create({
      name: 'Gatuno',
      description: `Description Dog 3`,
      level_energy: 4,
      size: Levels.MEDIUM,
      ambient: 'Ambiente pequeno',
      independence: Levels.BIG,
      age: StagesAge.ADULT,
      org_id: organization2.id,
    })

    const { pets } = await sut.execute({
      city: 'Campinas',
      state: 'sp',

      age: 'SENIOR',
      size: 'SMALL',
      levelEnergy: 5,
      independence: 'SMALL',
      page: 1,
    })

    expect(pets).toHaveLength(1)
  })

  it('Should to be able Fetch Pets by with pagination of 20 items', async () => {
    await generatePets.generateEqualsPets()

    const { pets } = await sut.execute({
      city: 'Campinas',
      state: 'sp',

      age: 'SENIOR',
      size: 'SMALL',
      levelEnergy: 5,
      independence: 'SMALL',
      page: 1,
    })

    expect(pets).toHaveLength(20)
  })
})

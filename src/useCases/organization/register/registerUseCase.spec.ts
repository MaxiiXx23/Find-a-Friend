import { describe, it, expect, beforeEach } from 'vitest'

import { InMemoryOrganizationRepository } from '@/http/repositories/organization/in-memory/in-memory-organization-repository'
import { RegisterUseCase } from './RegisterUseCase'

import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error'
import { InMemoryAddressRepository } from '@/http/repositories/address/in-memory/in-memory-address-repository'

let inMemoryOrganizationRepository: InMemoryOrganizationRepository
let inMemoryAddressRepository: InMemoryAddressRepository

let sut: RegisterUseCase

describe('Register Use Case Test Unit', () => {
  beforeEach(() => {
    inMemoryOrganizationRepository = new InMemoryOrganizationRepository()
    inMemoryAddressRepository = new InMemoryAddressRepository()

    sut = new RegisterUseCase(
      inMemoryOrganizationRepository,
      inMemoryAddressRepository,
    )
  })

  it('Should to be able register a organization', async () => {
    const { organization } = await sut.execute({
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

    expect(organization).toHaveProperty('id')
  })

  it('Should not be able register organization if email already exists', async () => {
    const email = 'organizationjohndoe@testing.com'

    await sut.execute({
      name_responsible: 'John Doe',
      email,
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

    expect(async () => {
      await sut.execute({
        name_responsible: 'John Doe',
        email,
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
    }).rejects.toBeInstanceOf(OrganizationAlreadyExistsError)
  })
})

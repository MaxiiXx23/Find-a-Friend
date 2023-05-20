import { describe, it, expect, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'

import { InMemoryOrganizationRepository } from '@/shared/http/repositories/organization/in-memory/in-memory-organization-repository'
import { AuthenticateUseCase } from './AuthenticateUseCase'

import { InvalidCredentialsError } from './errors/InvalidCredentialsError'

let inMemoryOrganizationsRepository: InMemoryOrganizationRepository
let sut: AuthenticateUseCase

const email = 'orgjoedoe@testing.com'

describe('Authenticate Use Case Test Unit', () => {
  beforeEach(async () => {
    inMemoryOrganizationsRepository = new InMemoryOrganizationRepository()
    sut = new AuthenticateUseCase(inMemoryOrganizationsRepository)

    const passwordHashed = await hash('123456', 6)

    await inMemoryOrganizationsRepository.create({
      name_responsible: 'John Doe',
      email,
      cep: '08599-123',
      address: 'R. Sebastião Ferreira dos Santos, 208',
      phone: '+55 31 97777-0000',
      password_hash: passwordHashed,
    })
  })

  it('Should to be able authenticate', async () => {
    const password = '123456'
    const { token } = await sut.execute({ email, password })

    expect(token).toEqual(expect.any(String))
  })

  it('Should not to be able authenticate with wrong email', async () => {
    const wrongEmail = 'wrongemail@testing.com'
    const password = '123456'

    expect(async () => {
      await sut.execute({ email: wrongEmail, password })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('Should not to be able authenticate with wrong password', async () => {
    const password = 'wrongPassword'

    expect(async () => {
      await sut.execute({ email, password })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})

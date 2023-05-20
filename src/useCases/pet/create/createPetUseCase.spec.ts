import { describe, it, expect, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'

import { Levels, StagesAge } from '@prisma/client'

import { InMemoryOrganizationRepository } from '@/shared/http/repositories/organization/in-memory/in-memory-organization-repository'
import { InMemoryPetRepository } from '@/shared/http/repositories/pet/in-memory/in-memory-pet-repository'
import { CreatePetUseCase } from './CreatePetUseCase'

import { OrganizationNotFoundError } from './errors/organization-not-found-error'

let organizationRepository: InMemoryOrganizationRepository
let petRepository: InMemoryPetRepository

let sut: CreatePetUseCase

describe('Create Pet Use Case Test Unit', () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationRepository()
    petRepository = new InMemoryPetRepository()

    sut = new CreatePetUseCase(organizationRepository, petRepository)
  })

  it('Should to be able create a pet', async () => {
    const passwordHashed = await hash('123456', 6)

    const org = await organizationRepository.create({
      id: 'id-org-1',
      name_responsible: 'John Doe',
      email: 'johndoe@orgtesting.com',
      phone: '+55 31 97777-0000',
      password_hash: passwordHashed,
    })

    const { pet } = await sut.execute({
      name: 'Suzi',
      description: `Suzy is a beautiful.`,
      level_energy: 5,
      size: Levels.SMALL,
      ambient: 'Ambiente amplo',
      age: StagesAge.YOUNG,
      independence: Levels.MEDIUM,
      org_id: org.id,
    })

    expect(pet).toHaveProperty('id')
    expect(pet).toHaveProperty('name')
  })

  it('Should not to be able create a pet if org does not exists.', async () => {
    const passwordHashed = await hash('123456', 6)

    await organizationRepository.create({
      id: 'id-org-1',
      name_responsible: 'John Doe',
      email: 'johndoe@orgtesting.com',
      phone: '+55 31 97777-0000',
      password_hash: passwordHashed,
    })

    expect(async () => {
      await sut.execute({
        name: 'Suzi',
        description: `Description Dog`,
        level_energy: 5,
        size: Levels.SMALL,
        ambient: 'Ambiente amplo',
        independence: Levels.MEDIUM,
        age: StagesAge.YOUNG,
        org_id: 'id-org-wrong',
      })
    }).rejects.toBeInstanceOf(OrganizationNotFoundError)
  })
})

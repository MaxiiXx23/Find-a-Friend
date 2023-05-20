import { Prisma, Organization } from '@prisma/client'
import { randomUUID } from 'crypto'

import { IOrganizationRepository } from '../IOrganizationRepository'

export class InMemoryOrganizationRepository implements IOrganizationRepository {
  itens: Organization[] = []

  async create({
    id,
    name_responsible,
    email,
    phone,
    password_hash,
  }: Prisma.OrganizationCreateInput): Promise<Organization> {
    const organization: Organization = {
      id: id ?? randomUUID(),
      name_responsible,
      email,
      phone,
      password_hash,
    }

    this.itens.push(organization)

    return organization
  }

  async findByEmail(email: string): Promise<Organization | null> {
    const organization = this.itens.find((org) => org.email === email)

    if (!organization) {
      return null
    }

    return organization
  }

  async findById(id: string): Promise<Organization | null> {
    const organization = this.itens.find((org) => org.id === id)

    if (!organization) {
      return null
    }

    return organization
  }
}

import { prisma } from '@/lib/prisma'
import { Prisma, Organization } from '@prisma/client'

import { IOrganizationRepository } from '../IOrganizationRepository'

export class PrismaOrganizationRepository implements IOrganizationRepository {
  async create({
    name_responsible,
    email,
    password_hash,
    phone,
  }: Prisma.OrganizationCreateInput): Promise<Organization> {
    const organization = await prisma.organization.create({
      data: {
        name_responsible,
        email,
        password_hash,
        phone,
      },
    })

    return organization
  }

  async findByEmail(email: string): Promise<Organization | null> {
    const organization = await prisma.organization.findFirst({
      where: {
        email,
      },
    })

    if (!organization) {
      return null
    }
    return organization
  }

  async findById(id: string): Promise<Organization | null> {
    const organization = await prisma.organization.findUnique({
      where: {
        id,
      },
    })

    if (!organization) {
      return null
    }

    return organization
  }
}

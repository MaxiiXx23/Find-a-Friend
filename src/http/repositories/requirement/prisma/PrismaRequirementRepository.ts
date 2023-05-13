import { prisma } from '@/lib/prisma'
import { IRequirementRepository } from '../IRequirementRepository'
import { Prisma, Requirement } from '@prisma/client'

export class PrismaRequirementRepository implements IRequirementRepository {
  async create({
    description,
    pet_id,
  }: Prisma.RequirementUncheckedCreateInput): Promise<Requirement> {
    const requirement = await prisma.requirement.create({
      data: {
        description,
        pet_id,
      },
    })

    return requirement
  }
}

import { randomUUID } from 'crypto'
import { Prisma, Requirement } from '@prisma/client'

import { IRequirementRepository } from '../IRequirementRepository'

export class InMemoryRequirementRepository implements IRequirementRepository {
  public items: Requirement[] = []

  async create({
    id,
    description,
    pet_id,
  }: Prisma.RequirementUncheckedCreateInput): Promise<Requirement> {
    const requirement: Requirement = {
      id: id ?? randomUUID(),
      description,
      pet_id,
    }

    this.items.push(requirement)

    return requirement
  }
}

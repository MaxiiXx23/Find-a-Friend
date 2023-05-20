import { Prisma, Requirement } from '@prisma/client'

export interface IRequirementRepository {
  create(data: Prisma.RequirementUncheckedCreateInput): Promise<Requirement>
  delete(id: string): Promise<Requirement | null>
}

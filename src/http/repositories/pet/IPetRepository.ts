import { Prisma, Pet, StagesAge, Levels } from '@prisma/client'

export interface IFetchByQueriesProps {
  idOrg: string
  age: StagesAge | undefined
  levelEnergy: number | undefined
  size: Levels | undefined
  independence: Levels | undefined
}

export interface IPetRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  delete(id: string): Promise<void>
  fetchByQueries(data: IFetchByQueriesProps): Promise<Pet[]>
}

import { Address, Prisma } from '@prisma/client'

export interface IFindByStateAndCityProps {
  state: string
  city: string
}

export interface IAddressRepository {
  create(data: Prisma.AddressUncheckedCreateInput): Promise<void>
  findByStateAndCity(data: IFindByStateAndCityProps): Promise<Address[]>
}

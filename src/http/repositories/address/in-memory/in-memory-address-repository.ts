import { Address, Prisma } from '@prisma/client'
import {
  IAddressRepository,
  IFindByStateAndCityProps,
} from '../IAddressRepository'
import { randomUUID } from 'crypto'

export class InMemoryAddressRepository implements IAddressRepository {
  public items: Address[] = []

  async create({
    cep,
    street,
    number,
    complement,
    district,
    city,
    state,
    org_id,
  }: Prisma.AddressUncheckedCreateInput): Promise<void> {
    const address: Address = {
      id: randomUUID(),
      cep,
      street,
      number,
      complement: complement ?? null,
      district,
      city,
      state,
      org_id,
    }

    this.items.push(address)
  }

  async findByStateAndCity({
    state,
    city,
  }: IFindByStateAndCityProps): Promise<Address[]> {
    const addressesWithStateFiltered = this.items.filter(
      (org) => org.state === state,
    )

    if (addressesWithStateFiltered.length === 0) {
      return addressesWithStateFiltered
    }

    const addressesWithCityFiltered = addressesWithStateFiltered.filter(
      (org) => org.city === city,
    )

    if (addressesWithCityFiltered.length === 0) {
      return addressesWithStateFiltered
    }

    return addressesWithCityFiltered
  }
}

import { prisma } from '@/lib/prisma'
import {
  IAddressRepository,
  IFindByStateAndCityProps,
} from '../IAddressRepository'
import { Address, Prisma } from '@prisma/client'

export class PrismaAddressRepository implements IAddressRepository {
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
    await prisma.address.create({
      data: {
        cep,
        street,
        number,
        complement,
        district,
        city,
        state,
        org_id,
      },
    })
  }

  async findByStateAndCity({
    city,
    state,
  }: IFindByStateAndCityProps): Promise<Address[]> {
    const addresses = await prisma.address.findMany({
      where: {
        city,
        state,
      },
    })

    return addresses
  }
}

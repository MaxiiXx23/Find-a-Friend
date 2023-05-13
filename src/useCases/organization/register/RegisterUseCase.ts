import { Organization } from '@prisma/client'
import { hash } from 'bcryptjs'

import { IOrganizationRepository } from '@/http/repositories/organization/IOrganizationRepository'
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error'
import { IAddressRepository } from '@/http/repositories/address/IAddressRepository'

interface IRequest {
  name_responsible: string
  email: string
  phone: string
  password: string
  cep: string
  street: string
  number: string
  complement: string
  district: string
  city: string
  state: string
}

interface IResponse {
  organization: Organization
}

export class RegisterUseCase {
  constructor(
    private organizationsRepository: IOrganizationRepository,
    private addressRepository: IAddressRepository,
  ) {}

  async execute({
    name_responsible,
    email,
    phone,
    password,
    cep,
    street,
    number,
    complement,
    district,
    city,
    state,
  }: IRequest): Promise<IResponse> {
    const organizationAlreadyExists =
      await this.organizationsRepository.findByEmail(email)

    if (organizationAlreadyExists) {
      throw new OrganizationAlreadyExistsError()
    }

    const passwordHashed = await hash(password, 6)

    const organization = await this.organizationsRepository.create({
      name_responsible,
      email,
      phone,
      password_hash: passwordHashed,
    })

    await this.addressRepository.create({
      cep,
      street,
      number,
      complement,
      district,
      city,
      state,
      org_id: organization.id,
    })

    return {
      organization,
    }
  }
}

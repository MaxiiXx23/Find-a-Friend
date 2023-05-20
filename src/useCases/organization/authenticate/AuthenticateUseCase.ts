import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import { IOrganizationRepository } from '@/shared/http/repositories/organization/IOrganizationRepository'
import { auth } from '@/config/auth'

import { InvalidCredentialsError } from './errors/InvalidCredentialsError'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  token: string
}

export class AuthenticateUseCase {
  constructor(private organizationsRepository: IOrganizationRepository) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const organization = await this.organizationsRepository.findByEmail(email)

    if (!organization) {
      throw new InvalidCredentialsError()
    }

    const doesMatchedPasswords = await compare(
      password,
      organization.password_hash,
    )

    if (!doesMatchedPasswords) {
      throw new InvalidCredentialsError()
    }

    const token = sign({}, auth.secret_key_JWT, {
      subject: organization.id,
      expiresIn: auth.experies_in_JWT,
    })

    return {
      token,
    }
  }
}

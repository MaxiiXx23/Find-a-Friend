import { Request, Response, NextFunction } from 'express'

import { z } from 'zod'

import { makeAuthenticateUseCase } from '@/useCases/organization/authenticate/factories/makeAuthenticateUseCase'
import { InvalidCredentialsError } from '@/useCases/organization/authenticate/errors/InvalidCredentialsError'

export async function authenticateController(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authenticateSchemaBody = z.object({
    email: z.string().email('Email with shape invalid'),
    password: z.string(),
  })

  try {
    const { email, password } = authenticateSchemaBody.parse(request.body)

    const authenticateUseCase = makeAuthenticateUseCase()

    const { token } = await authenticateUseCase.execute({
      email,
      password,
    })

    return response.status(200).json({ token })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return response.status(409).json({ error: err.message })
    }
    response.status(500)
    return next(err)
  }
}

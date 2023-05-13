import { NextFunction, Request, Response } from 'express'

import { z } from 'zod'

import { makeRegisterUseCase } from '@/useCases/organization/register/factories/makeRegisterUseCase'

import { OrganizationAlreadyExistsError } from '@/useCases/organization/register/errors/organization-already-exists-error'

export async function registerOrganizationController(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const registerBodySchema = z.object({
    name_responsible: z
      .string()
      .max(80, 'name responsible must have on the maximus 80 caracteres'),
    email: z.string().email(),
    phone: z
      .string()
      .min(17, 'Phone number is invalid')
      .max(17, 'Phone number is invalid'),
    password: z
      .string()
      .min(12, 'Password must have between 12 than 60 caracteres')
      .max(60, 'Password must have between 12 than 60 caracteres'),
    cep: z
      .string()
      .min(8, 'CEP must have between 8 than 6 caracteres')
      .max(8, 'CEP must have between 8 than 6 caracteres'),
    street: z
      .string()
      .max(60, 'Street  must have on the maximus 60 caracteres'),
    // modify in BD to type number
    number: z.string(),
    complement: z
      .string()
      .max(40, 'Complement must have on the maximus 40 caractere'),
    district: z
      .string()
      .max(80, 'District must have on the maximus 80 caractere'),
    city: z.string().max(80, 'City must have on the maximus 80 caractere'),
    state: z
      .string()
      .max(2, 'State must have on the maximus 80 caractere')
      .toLowerCase(),
  })

  try {
    const {
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
    } = registerBodySchema.parse(request.body)

    const registerUseCase = makeRegisterUseCase()

    const { organization } = await registerUseCase.execute({
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
    })

    return response.status(201).json({ organization })
  } catch (err) {
    if (err instanceof OrganizationAlreadyExistsError) {
      return response.status(409).json({ error: err.message })
    }
    response.status(500)
    return next(err)
  }
}

import { OrganizationNotFoundError } from '@/useCases/pet/create/errors/organization-not-found-error'
import { makeCreatePetUseCase } from '@/useCases/pet/create/factories/makeCreatePetUseCase'
import { Request, Response, NextFunction } from 'express'

import { z } from 'zod'

export async function createPetController(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { id } = request.user

  const createPetSchemaBody = z.object({
    name: z.string().max(80, 'Name must have on the maximus 80 caracteres'),
    description: z
      .string()
      .max(256, 'Description must have on the maximus 256 caracteres'),
    level_energy: z.number().int('Number must to be integer.'),
    size: z.enum(['SMALL', 'MEDIUM', 'BIG']),
    independence: z.enum(['SMALL', 'MEDIUM', 'BIG']),
    age: z.enum(['PUPPY', 'YOUNG', 'ADULT', 'SENIOR']),
    ambient: z
      .string()
      .max(40, 'Ambient must have on the maximus 40 caracteres'),
  })

  try {
    const {
      name,
      description,
      level_energy,
      size,
      independence,
      age,
      ambient,
    } = createPetSchemaBody.parse(request.body)

    const createPetUseCase = makeCreatePetUseCase()

    const { pet } = await createPetUseCase.execute({
      name,
      description,
      level_energy,
      size,
      independence,
      age,
      ambient,
      org_id: id,
    })

    return response.status(201).json({ pet })
  } catch (err) {
    if (err instanceof OrganizationNotFoundError) {
      return response.status(409).json({ error: err.message })
    }
    response.status(500)
    return next(err)
  }
}

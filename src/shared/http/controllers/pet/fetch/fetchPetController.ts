import { Request, Response, NextFunction } from 'express'

import { z } from 'zod'

import { PetsNotFoundByStateError } from '@/useCases/pet/fetch/errors/Pets-not-found-by-state-error'
import { makeFetchPetUseCase } from '@/useCases/pet/fetch/factories/makeFetchPetUseCase'

export async function fetchPetController(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const fetchPetSchemaQuery = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const fetchPetSchemaBody = z.object({
    city: z.string(),
    state: z.string(),
    age: z.enum(['PUPPY', 'YOUNG', 'ADULT', 'SENIOR']).or(z.any(undefined)),
    levelEnergy: z
      .number()
      .int('LevelEnergy must to be integer')
      .or(z.any(undefined)),
    size: z.enum(['SMALL', 'MEDIUM', 'BIG']).or(z.any(undefined)),
    independence: z.enum(['SMALL', 'MEDIUM', 'BIG']).or(z.any(undefined)),
  })

  try {
    const { page } = fetchPetSchemaQuery.parse(request.query)

    const { city, state, age, levelEnergy, size, independence } =
      fetchPetSchemaBody.parse(request.body)

    const fetchPetUseCase = makeFetchPetUseCase()

    const { pets } = await fetchPetUseCase.execute({
      city,
      state,
      age,
      levelEnergy,
      size,
      independence,
      page,
    })

    return response.status(200).json({ pets })
  } catch (err) {
    if (err instanceof PetsNotFoundByStateError) {
      return response.status(409).json({ error: err.message })
    }
    response.status(500)
    return next(err)
  }
}

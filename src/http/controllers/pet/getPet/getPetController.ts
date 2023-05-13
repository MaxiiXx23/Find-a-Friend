import { Request, Response, NextFunction } from 'express'

import { z } from 'zod'

import { makeGetPetUseCase } from '@/useCases/pet/getPet/factories/makeGetPetUseCase'
import { PetNotFoundError } from '@/useCases/requirement/create/errors/PetNotFoundError'

export async function getPetController(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const getPetSchemaQuery = z.object({
    petId: z.string().uuid('petId must to be a string uuid'),
  })

  try {
    const { petId } = getPetSchemaQuery.parse(request.query)

    const getPetUseCase = makeGetPetUseCase()

    const { pet } = await getPetUseCase.execute({
      petId,
    })

    return response.status(200).json({ pet })
  } catch (err) {
    if (err instanceof PetNotFoundError) {
      return response.status(400).json({ error: err.message })
    }
    response.status(500)
    return next(err)
  }
}

import { Request, Response, NextFunction } from 'express'

import { z } from 'zod'

import { makeDeletePetUseCase } from '@/useCases/pet/delete/factories/makeDeletePetUseCase'

import { ResourceNotFoundError } from '@/useCases/errors/ResourceNotFoundError'

export async function deletePetController(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const deleteSchemaQuery = z.object({
    petId: z.string().uuid(),
  })

  try {
    const { petId } = deleteSchemaQuery.parse(request.query)

    const deletePetUseCase = makeDeletePetUseCase()

    await deletePetUseCase.execute({ petId })
    return response.status(200).json({ msg: 'Pet deleted' })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return response.status(404).json({ error: err.message })
    }
    response.status(500)
    return next(err)
  }
}

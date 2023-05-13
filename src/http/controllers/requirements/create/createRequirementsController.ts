import { Request, Response, NextFunction } from 'express'

import { PetNotFoundError } from '@/useCases/requirement/create/errors/PetNotFoundError'
import { makeCreateRequirementUseCase } from '@/useCases/requirement/create/factories/makeCreateRequirementUseCase'

import { z } from 'zod'

export async function createRequirementsController(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const createRequirementsSchemaBody = z.object({
    requirementsDescription: z.array(z.string()),
    petId: z.string().uuid(),
  })

  try {
    const { requirementsDescription, petId } =
      createRequirementsSchemaBody.parse(request.body)

    const createRequirementUseCase = makeCreateRequirementUseCase()

    const { requirements } = await createRequirementUseCase.execute({
      requirementsDescription,
      petId,
    })

    return response.status(201).json(requirements)
  } catch (err) {
    if (err instanceof PetNotFoundError) {
      return response.status(404).json({ error: err.message })
    }
    response.status(500)
    return next(err)
  }
}

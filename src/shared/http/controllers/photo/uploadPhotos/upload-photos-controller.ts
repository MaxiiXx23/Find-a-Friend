import { Request, Response, NextFunction, Express } from 'express'

import { ResourceNotFoundError } from '@/useCases/errors/ResourceNotFoundError'

import { z } from 'zod'
import { PathsNotSendedError } from '@/useCases/photo/errors/Paths-not-sended-error'
import { makeUploadPhotosUseCase } from '@/useCases/photo/upload/factories/make-upload-photos-use-case'

export async function uploadPhotosController(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const uploadPhotosSchemaParams = z.object({
    petId: z.string().uuid(),
  })

  try {
    const { petId } = uploadPhotosSchemaParams.parse(request.params)

    const uploadPhotosUseCase = makeUploadPhotosUseCase()

    const { photosPet } = await uploadPhotosUseCase.execute({
      filenames: request.files as Express.Multer.File[],
      petId,
    })

    return response.status(201).json(photosPet)
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return response.status(404).json({ error: err.message })
    } else if (err instanceof PathsNotSendedError) {
      return response.status(400).json({ error: err.message })
    }

    response.status(500)
    return next(err)
  }
}

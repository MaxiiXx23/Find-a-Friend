import { randomUUID } from 'crypto'
import { Express } from 'express'

// interface IFile {
//   fieldname: string
//   originalname: string
//   encoding: string
//   mimetype: string
//   size: number
//   stream: Readable
//   destination: string
//   filename: string
//   path: string
//   buffer: Buffer
// }

interface IGeneratePaths {
  file: Express.Multer.File
}

export function generatePath({ file }: IGeneratePaths): string {
  const filenameSplited = file.originalname.split('.')
  const path = `${filenameSplited[0]}-${randomUUID()}.${filenameSplited[1]}`

  return path
}

import { resolve } from 'path'

import multer from 'multer'
import { generatePath } from '@/utils/useCases/generatePath'

const tmpFolder = resolve(__dirname, '..', '..', 'temp')

export const upload = {
  tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: (request, file, callback) => {
      const filename = generatePath({
        file,
      })
      return callback(null, filename)
    },
  }),
}

import fs from 'fs'
import { resolve } from 'path'

import { upload } from '@/config/upload'

import { IStorageProvider } from '../IStorageProvider'
import { deleteFile } from '@/utils/deleteFile'

class LocalStorageProvider implements IStorageProvider {
  async save(file: string, folder: string): Promise<string> {
    await fs.promises.rename(
      resolve(upload.tmpFolder, file),
      resolve(`${upload.tmpFolder}/${folder}`, file),
    )
    return file
  }

  async delete(file: string, folder: string): Promise<string | Error> {
    const filename = resolve(`${upload.tmpFolder}/${folder}`, file)
    try {
      await deleteFile(filename)
      return `file deleted.`
    } catch (error) {
      const errorDelete = error as Error

      return errorDelete
    }
  }
}

export { LocalStorageProvider }

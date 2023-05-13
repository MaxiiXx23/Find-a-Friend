import fs from 'fs'

async function deleteFile(filename: string) {
  try {
    await fs.promises.stat(filename)
  } catch {
    return
  }
  await fs.promises.unlink(filename)
}

export { deleteFile }

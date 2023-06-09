interface IStorageProvider {
  save(file: string, folder: string): Promise<string>
  delete(file: string, folder: string): Promise<string | Error>
}

export { IStorageProvider }

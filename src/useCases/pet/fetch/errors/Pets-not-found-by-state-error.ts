export class PetsNotFoundByStateError extends Error {
  constructor() {
    super('Pets not found by state.')
  }
}

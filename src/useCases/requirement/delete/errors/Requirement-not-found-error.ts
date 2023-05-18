export class RequirementNotFoundError extends Error {
  constructor() {
    super('Requirement not found to be deleted.')
  }
}

export class DuplicateUserError extends Error {
  constructor(message: string = 'User Already exist') {
    super(message);
  }
}

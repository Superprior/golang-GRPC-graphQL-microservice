export class InvalidLoginError extends Error {
  constructor(message: string = 'Invalid email or password') {
    super(message);
  }
}

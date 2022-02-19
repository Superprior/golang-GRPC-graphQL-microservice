import { LoginInput } from './input/login.input';
import { RegisterInput } from './input/register.input';
import { User } from '../user';

export interface IAuthenticationService {
  register: (input: RegisterInput) => Promise<User>;
  login: (input: LoginInput) => Promise<string>;
}

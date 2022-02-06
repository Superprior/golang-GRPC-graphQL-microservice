import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';
import { User } from '../user';

export interface IAuthenticationService {
  register: (input: RegisterInput) => Promise<User>;
  login: (input: LoginInput) => Promise<string>;
}

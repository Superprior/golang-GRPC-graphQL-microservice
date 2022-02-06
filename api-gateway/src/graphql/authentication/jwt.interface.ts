import { User } from '../user';

export interface IJWTService {
  generateToken: (user: Omit<User, 'password'>) => string;
}

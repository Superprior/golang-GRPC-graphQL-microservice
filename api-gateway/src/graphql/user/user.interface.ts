import { UserCreateInput } from './user.input';
import { User } from './user.model';

export interface IUserService {
  getByEmail: (email: string) => Promise<User | null>;
  getById: (id: string) => Promise<User | null>;
  create: (input: UserCreateInput) => Promise<User>;
}

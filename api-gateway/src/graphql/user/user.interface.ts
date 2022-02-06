import { UserCreateDto } from '.';
import { User } from './user.model';

export interface IUserService {
  findOneByEmail: (email: string) => Promise<User | null>;
  findOneById: (id: string) => Promise<User | null>;
  create: (input: UserCreateDto) => Promise<User>;
}

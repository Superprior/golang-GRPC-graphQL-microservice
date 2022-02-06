import 'reflect-metadata';
import { injectable } from 'inversify';
import { User } from './user.model';
import { IUserService } from './user.interface';
import { UserCreateDto } from './user.dto';

const usersInDatabase = [];

@injectable()
export class UserService implements IUserService {
  async findOneById(id: string) {
    return usersInDatabase.find((user) => user.id === id) as User;
  }

  async findOneByEmail(email: string) {
    return usersInDatabase.find((user) => user.email === email) as User;
  }

  async create(input: UserCreateDto): Promise<User> {
    const user = { ...input, id: 'user_id' };
    usersInDatabase.push(user);
    return user;
  }
}

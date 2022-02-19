import { Service } from 'typedi';
import { logger } from '../../middleware';
import { User } from './user.model';
import { IUserService } from './user.interface';
import { UserCreateInput } from './user.input';
import { grpcClient, IGrpcClient } from './user.grpc.client';
import { UserMapper } from './user.mapper';

const usersInDatabase = [];

@Service()
export class UserService implements IUserService {
  private readonly grpcClient: IGrpcClient;

  constructor() {
    this.grpcClient = grpcClient;
  }

  async getById(id: string): Promise<User | null> {
    const { data } = await this.grpcClient.getUserById({ id });
    return data.user ? UserMapper.grpcResponseToDto(data.user!) : null;
    // return usersInDatabase.find((user) => user.id === id) as User;
  }

  async getByEmail(email: string): Promise<User | null> {
    const { data } = await this.grpcClient.getUserByEmail({ email });
    return data.user ? UserMapper.grpcResponseToDto(data.user!) : null;
    // return usersInDatabase.find((user) => user.email === email) as User;
  }

  async create(input: UserCreateInput): Promise<User> {
    const { data } = await this.grpcClient.createUser(input);
    return UserMapper.grpcResponseToDto(data.user!);
    // const user = { ...input, id: 'user_id' };
    // usersInDatabase.push(user);
    // return user;
  }
}

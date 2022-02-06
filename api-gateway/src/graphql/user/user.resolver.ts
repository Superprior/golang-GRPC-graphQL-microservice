/* eslint-disable @typescript-eslint/no-unused-vars */
import { Arg, Resolver, Query } from 'type-graphql';
import { User } from './user.model';
import { UserService } from './user.service';

@Resolver((of) => User)
export class UserResolver {
  @Query((returns) => User)
  async user(@Arg('id') id: string): Promise<User> {
    return {} as User;
  }
}

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Service } from 'typedi';
import { Arg, Resolver, Query, Authorized } from 'type-graphql';
import { UserService } from './user.service';
import { User } from './user.model';
import { UserResponse } from './user.unions';

@Service()
@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {
    this.userService = userService;
  }

  // @Authorized()
  @Query((returns) => UserResponse)
  async user(@Arg('id') id: string): Promise<typeof UserResponse> {
    const user = await this.userService.getById(id);
    if (user) return user;
    return { code: 404, message: 'User not found!' };
  }
}

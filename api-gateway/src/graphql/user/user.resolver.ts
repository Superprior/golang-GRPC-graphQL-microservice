/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Service } from 'typedi';
import { Arg, Resolver, Query, Authorized } from 'type-graphql';
import { UserService } from './user.service';
import { User } from './user.model';
import { UserResultUnion } from './unions';

@Service()
@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {
    this.userService = userService;
  }

  @Authorized()
  @Query((returns) => UserResultUnion)
  async user(@Arg('id') id: string): Promise<typeof UserResultUnion> {
    const user = await this.userService.findOneById(id);
    if (user) return user;
    return { code: '10', message: 'User not found!' };
  }
}

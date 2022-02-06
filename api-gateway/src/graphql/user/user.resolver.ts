/* eslint-disable @typescript-eslint/no-unused-vars */
import { inject, injectable } from 'inversify';
import { Arg, Resolver, Query, Authorized } from 'type-graphql';
import { TYPES } from '../../inversify/types';
import { User } from './user.model';
import { IUserService } from './user.interface';

@injectable()
@Resolver((of) => User)
export class UserResolver {
  private userService: IUserService;

  constructor(@inject(TYPES.IUserService) userService: IUserService) {
    this.userService = userService;
  }

  @Authorized()
  @Query((returns) => User)
  async user(@Arg('id') id: string): Promise<User> {
    return this.userService.findOneById(id);
  }
}

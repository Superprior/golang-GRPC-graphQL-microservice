import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { Resolver, Arg, Mutation } from 'type-graphql';
import { TYPES } from '../../inversify/types';
import { logger } from '../../middleware/logger';
import { IAuthenticationService } from './authentication.interface';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';
import { User } from '../user';
import { LoginResponse } from './dto/login.response';

@injectable()
@Resolver((of) => User)
export class AuthenticationResolver {
  private authenticationService: IAuthenticationService;

  constructor(
    @inject(TYPES.IAuthenticationService)
    authenticationService: IAuthenticationService
  ) {
    this.authenticationService = authenticationService;
  }

  @Mutation((type) => User)
  async register(@Arg('input') input: RegisterInput): Promise<User> {
    return this.authenticationService.register(input);
  }

  @Mutation((type) => LoginResponse)
  async login(@Arg('input') input: LoginInput): Promise<LoginResponse> {
    const accessToken = await this.authenticationService.login(input);
    return {
      accessToken
    };
  }
}

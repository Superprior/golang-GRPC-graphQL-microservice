import { Service } from 'typedi';
import { Resolver, Arg, Mutation } from 'type-graphql';
import { logger } from '../../middleware/logger';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';
import { User } from '../user';
import { LoginResponse } from './dto/login.response';
import { AuthenticationService } from './authentication.service';

@Service()
@Resolver((of) => User)
export class AuthenticationResolver {
  // eslint-disable-next-line no-empty-function
  constructor(private readonly authenticationService: AuthenticationService) {}

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

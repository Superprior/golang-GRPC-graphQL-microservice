import { Service } from 'typedi';
import { Resolver, Arg, Mutation } from 'type-graphql';
import { logger } from '../../middleware/logger';
import { LoginInput } from './input/login.input';
import { RegisterInput } from './input/register.input';
import { User } from '../user';
import { AuthenticationService } from './authentication.service';
import { LoginResponse, RegisterResponse } from './authentication.unions';
import { InvalidLoginError } from './error/invalid-login.error';
import { DuplicateUserError } from './error/duplicate-user.error';

@Service()
@Resolver((of) => User)
export class AuthenticationResolver {
  // eslint-disable-next-line no-empty-function
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Mutation((type) => RegisterResponse)
  async register(
    @Arg('input') input: RegisterInput
  ): Promise<typeof RegisterResponse> {
    try {
      const user = await this.authenticationService.register(input);
      return user;
    } catch (err) {
      const error = { message: err.message };
      if (err instanceof DuplicateUserError) {
        return { ...error, code: 400 };
      }
      logger.info(error);
      throw err;
    }
  }

  @Mutation((type) => LoginResponse)
  async login(@Arg('input') input: LoginInput): Promise<typeof LoginResponse> {
    try {
      const accessToken = await this.authenticationService.login(input);
      return {
        accessToken
      };
    } catch (err) {
      if (err instanceof InvalidLoginError) {
        return { code: 400, message: err.message };
      }
      logger.info({ error: err.message });
      throw err;
    }
  }
}

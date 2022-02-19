/* eslint-disable no-empty-function */
import { Service } from 'typedi';
import { LoginInput } from './input/login.input';
import { RegisterInput } from './input/register.input';
import { User, UserService } from '../user';
import { hashPassword, comparePassword } from './password.helper';
import { IAuthenticationService } from './authentication.interface';
import { JWTService } from './jwt.service';
import { DuplicateUserError } from './error/duplicate-user.error';
import { InvalidLoginError } from './error/invalid-login.error';

@Service()
export class AuthenticationService implements IAuthenticationService {
  constructor(
    private readonly jwtService: JWTService,
    private readonly userService: UserService
  ) {}

  async register(input: RegisterInput): Promise<User> {
    const user = await this.userService.getByEmail(input.email);
    if (user) throw new DuplicateUserError();
    const hashedPassword = await hashPassword(input.password);
    const createdUser = await this.userService.create({
      ...input,
      password: hashedPassword
    });
    return createdUser;
  }

  async login(input: LoginInput) {
    const user = await this.userService.getByEmail(input.email);
    if (!user) throw new InvalidLoginError();
    const { password, ...rest } = user;
    const isValidPassword = await comparePassword(input.password, password);

    if (!isValidPassword) {
      throw new InvalidLoginError();
    }
    return this.jwtService.generateToken(rest);
  }
}

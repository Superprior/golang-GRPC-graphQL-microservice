import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';
import { IUserService, User } from '../user';
import { hashPassword, comparePassword } from './password.helper';
import { IAuthenticationService } from './authentication.interface';
import { TYPES } from '../../inversify/types';
import { IJWTService } from './jwt.interface';

@injectable()
export class AuthenticationService implements IAuthenticationService {
  private jwtService: IJWTService;

  private userService: IUserService;

  constructor(
    @inject(TYPES.IJWTService) jwtService: IJWTService,
    @inject(TYPES.IUserService) userService: IUserService
  ) {
    this.jwtService = jwtService;
    this.userService = userService;
  }

  async register(input: RegisterInput): Promise<User> {
    const user = await this.userService.findOneByEmail(input.email);
    if (user) throw new Error('User Already exist');
    const hashedPassword = await hashPassword(input.password);
    const createdUser = await this.userService.create({
      ...input,
      password: hashedPassword
    });
    return createdUser;
  }

  async login(input: LoginInput) {
    const user = await this.userService.findOneByEmail(input.email);
    if (!user) throw new Error('Invalid email or password');
    const { password, ...rest } = user;
    const isValidPassword = await comparePassword(input.password, password);

    if (!isValidPassword) {
      throw new Error('Invalid email or password');
    }
    return this.jwtService.generateToken(rest);
  }
}

/* eslint-disable no-empty-function */
import { Service } from 'typedi';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';
import { User, UserService } from '../user';
import { hashPassword, comparePassword } from './password.helper';
import { IAuthenticationService } from './authentication.interface';
import { JWTService } from './jwt.service';

@Service()
export class AuthenticationService implements IAuthenticationService {
  constructor(
    private readonly jwtService: JWTService,
    private readonly userService: UserService
  ) {}

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

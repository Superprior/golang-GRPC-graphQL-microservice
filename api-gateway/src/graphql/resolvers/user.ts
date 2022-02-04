import { Resolver, Arg, Mutation } from 'type-graphql';
import { Service } from 'typedi';
import UserService from '../../services/user.service';
import LoginUserInput from '../inputs/user/loginUserInput';
import RegisterUserInput from '../inputs/user/registerUserInput';
import User from '../models/user';
import LoginResponse from '../response/loginResponse';

@Service()
@Resolver((of) => User)
export default class UserResolver {
  @Mutation((returns) => User)
  async register(@Arg('input') input: RegisterUserInput) {
    const res = await UserService.registerUser(input);
    return {} as User;
  }

  @Mutation((returns) => LoginResponse)
  async login(@Arg('input') input: LoginUserInput) {
    // Validate Password and User
    // Return User and Access Token
    return {
      accessToken: 'jhfksjhdk'
    } as LoginResponse;
  }
}

import { Service } from 'typedi';
import LoginUserInput from '../graphql/inputs/user/loginUserInput';
import RegisterUserInput from '../graphql/inputs/user/registerUserInput';

@Service()
export default class UserService {
  static async registerUser(input: RegisterUserInput) {
    // Hash the User password
    // Save User in Database
    // Return Saved User
    return Promise.resolve(true);
  }

  static async loginUser(input: LoginUserInput) {
    // fetch User from Database
    // Validate User password
    // Return User & Access token
    return Promise.resolve(true);
  }
}

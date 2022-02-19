/* eslint-disable camelcase */
import { User__Output } from './proto/user/User';
import { User } from './user.model';

export class UserMapper {
  static grpcResponseToDto(user: User__Output): User {
    return user as User;
  }
}

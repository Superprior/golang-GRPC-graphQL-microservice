// Original file: ../microservices/user-service/user.proto

import type { User as _user_User, User__Output as _user_User__Output } from '../user/User';

export interface GetUserByIdData {
  'user'?: (_user_User | null);
  '_user'?: "user";
}

export interface GetUserByIdData__Output {
  'user'?: (_user_User__Output);
}

// Original file: src/protobuf/user.proto

import type { User as _user_User, User__Output as _user_User__Output } from '../user/User';

export interface GetUserByEmailData {
  'user'?: (_user_User | null);
  '_user'?: "user";
}

export interface GetUserByEmailData__Output {
  'user'?: (_user_User__Output);
}

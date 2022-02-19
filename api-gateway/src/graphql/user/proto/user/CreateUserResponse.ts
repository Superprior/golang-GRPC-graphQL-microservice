// Original file: ../microservices/user-service/user.proto

import type { CreateUserData as _user_CreateUserData, CreateUserData__Output as _user_CreateUserData__Output } from '../user/CreateUserData';
import type { ResponseError as _user_ResponseError, ResponseError__Output as _user_ResponseError__Output } from '../user/ResponseError';

export interface CreateUserResponse {
  'data'?: (_user_CreateUserData | null);
  'error'?: (_user_ResponseError | null);
  '_data'?: "data";
  '_error'?: "error";
}

export interface CreateUserResponse__Output {
  'data'?: (_user_CreateUserData__Output);
  'error'?: (_user_ResponseError__Output);
}

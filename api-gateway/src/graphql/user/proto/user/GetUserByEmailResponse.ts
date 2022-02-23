// Original file: src/protobuf/user.proto

import type { GetUserByEmailData as _user_GetUserByEmailData, GetUserByEmailData__Output as _user_GetUserByEmailData__Output } from '../user/GetUserByEmailData';
import type { ResponseError as _user_ResponseError, ResponseError__Output as _user_ResponseError__Output } from '../user/ResponseError';

export interface GetUserByEmailResponse {
  'data'?: (_user_GetUserByEmailData | null);
  'error'?: (_user_ResponseError | null);
  '_data'?: "data";
  '_error'?: "error";
}

export interface GetUserByEmailResponse__Output {
  'data'?: (_user_GetUserByEmailData__Output);
  'error'?: (_user_ResponseError__Output);
}

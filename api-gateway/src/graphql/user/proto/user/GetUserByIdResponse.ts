// Original file: src/protobuf/user.proto

import type { GetUserByIdData as _user_GetUserByIdData, GetUserByIdData__Output as _user_GetUserByIdData__Output } from '../user/GetUserByIdData';
import type { ResponseError as _user_ResponseError, ResponseError__Output as _user_ResponseError__Output } from '../user/ResponseError';

export interface GetUserByIdResponse {
  'data'?: (_user_GetUserByIdData | null);
  'error'?: (_user_ResponseError | null);
  '_data'?: "data";
  '_error'?: "error";
}

export interface GetUserByIdResponse__Output {
  'data'?: (_user_GetUserByIdData__Output);
  'error'?: (_user_ResponseError__Output);
}

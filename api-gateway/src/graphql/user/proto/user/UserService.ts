// Original file: ../microservices/user-service/user.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { CreateUserRequest as _user_CreateUserRequest, CreateUserRequest__Output as _user_CreateUserRequest__Output } from '../user/CreateUserRequest';
import type { CreateUserResponse as _user_CreateUserResponse, CreateUserResponse__Output as _user_CreateUserResponse__Output } from '../user/CreateUserResponse';
import type { GetUserByEmailRequest as _user_GetUserByEmailRequest, GetUserByEmailRequest__Output as _user_GetUserByEmailRequest__Output } from '../user/GetUserByEmailRequest';
import type { GetUserByEmailResponse as _user_GetUserByEmailResponse, GetUserByEmailResponse__Output as _user_GetUserByEmailResponse__Output } from '../user/GetUserByEmailResponse';
import type { GetUserByIdRequest as _user_GetUserByIdRequest, GetUserByIdRequest__Output as _user_GetUserByIdRequest__Output } from '../user/GetUserByIdRequest';
import type { GetUserByIdResponse as _user_GetUserByIdResponse, GetUserByIdResponse__Output as _user_GetUserByIdResponse__Output } from '../user/GetUserByIdResponse';

export interface UserServiceClient extends grpc.Client {
  CreateUser(argument: _user_CreateUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_CreateUserResponse__Output>): grpc.ClientUnaryCall;
  CreateUser(argument: _user_CreateUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_CreateUserResponse__Output>): grpc.ClientUnaryCall;
  CreateUser(argument: _user_CreateUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_user_CreateUserResponse__Output>): grpc.ClientUnaryCall;
  CreateUser(argument: _user_CreateUserRequest, callback: grpc.requestCallback<_user_CreateUserResponse__Output>): grpc.ClientUnaryCall;
  createUser(argument: _user_CreateUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_CreateUserResponse__Output>): grpc.ClientUnaryCall;
  createUser(argument: _user_CreateUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_CreateUserResponse__Output>): grpc.ClientUnaryCall;
  createUser(argument: _user_CreateUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_user_CreateUserResponse__Output>): grpc.ClientUnaryCall;
  createUser(argument: _user_CreateUserRequest, callback: grpc.requestCallback<_user_CreateUserResponse__Output>): grpc.ClientUnaryCall;
  
  GetUserByEmail(argument: _user_GetUserByEmailRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_GetUserByEmailResponse__Output>): grpc.ClientUnaryCall;
  GetUserByEmail(argument: _user_GetUserByEmailRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_GetUserByEmailResponse__Output>): grpc.ClientUnaryCall;
  GetUserByEmail(argument: _user_GetUserByEmailRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_user_GetUserByEmailResponse__Output>): grpc.ClientUnaryCall;
  GetUserByEmail(argument: _user_GetUserByEmailRequest, callback: grpc.requestCallback<_user_GetUserByEmailResponse__Output>): grpc.ClientUnaryCall;
  getUserByEmail(argument: _user_GetUserByEmailRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_GetUserByEmailResponse__Output>): grpc.ClientUnaryCall;
  getUserByEmail(argument: _user_GetUserByEmailRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_GetUserByEmailResponse__Output>): grpc.ClientUnaryCall;
  getUserByEmail(argument: _user_GetUserByEmailRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_user_GetUserByEmailResponse__Output>): grpc.ClientUnaryCall;
  getUserByEmail(argument: _user_GetUserByEmailRequest, callback: grpc.requestCallback<_user_GetUserByEmailResponse__Output>): grpc.ClientUnaryCall;
  
  GetUserById(argument: _user_GetUserByIdRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_GetUserByIdResponse__Output>): grpc.ClientUnaryCall;
  GetUserById(argument: _user_GetUserByIdRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_GetUserByIdResponse__Output>): grpc.ClientUnaryCall;
  GetUserById(argument: _user_GetUserByIdRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_user_GetUserByIdResponse__Output>): grpc.ClientUnaryCall;
  GetUserById(argument: _user_GetUserByIdRequest, callback: grpc.requestCallback<_user_GetUserByIdResponse__Output>): grpc.ClientUnaryCall;
  getUserById(argument: _user_GetUserByIdRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_GetUserByIdResponse__Output>): grpc.ClientUnaryCall;
  getUserById(argument: _user_GetUserByIdRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_GetUserByIdResponse__Output>): grpc.ClientUnaryCall;
  getUserById(argument: _user_GetUserByIdRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_user_GetUserByIdResponse__Output>): grpc.ClientUnaryCall;
  getUserById(argument: _user_GetUserByIdRequest, callback: grpc.requestCallback<_user_GetUserByIdResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface UserServiceHandlers extends grpc.UntypedServiceImplementation {
  CreateUser: grpc.handleUnaryCall<_user_CreateUserRequest__Output, _user_CreateUserResponse>;
  
  GetUserByEmail: grpc.handleUnaryCall<_user_GetUserByEmailRequest__Output, _user_GetUserByEmailResponse>;
  
  GetUserById: grpc.handleUnaryCall<_user_GetUserByIdRequest__Output, _user_GetUserByIdResponse>;
  
}

export interface UserServiceDefinition extends grpc.ServiceDefinition {
  CreateUser: MethodDefinition<_user_CreateUserRequest, _user_CreateUserResponse, _user_CreateUserRequest__Output, _user_CreateUserResponse__Output>
  GetUserByEmail: MethodDefinition<_user_GetUserByEmailRequest, _user_GetUserByEmailResponse, _user_GetUserByEmailRequest__Output, _user_GetUserByEmailResponse__Output>
  GetUserById: MethodDefinition<_user_GetUserByIdRequest, _user_GetUserByIdResponse, _user_GetUserByIdRequest__Output, _user_GetUserByIdResponse__Output>
}

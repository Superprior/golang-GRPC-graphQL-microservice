import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { UserServiceClient as _user_UserServiceClient, UserServiceDefinition as _user_UserServiceDefinition } from './user/UserService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  user: {
    CreateUserData: MessageTypeDefinition
    CreateUserRequest: MessageTypeDefinition
    CreateUserResponse: MessageTypeDefinition
    GetUserByEmailData: MessageTypeDefinition
    GetUserByEmailRequest: MessageTypeDefinition
    GetUserByEmailResponse: MessageTypeDefinition
    GetUserByIdData: MessageTypeDefinition
    GetUserByIdRequest: MessageTypeDefinition
    GetUserByIdResponse: MessageTypeDefinition
    ResponseError: MessageTypeDefinition
    User: MessageTypeDefinition
    UserService: SubtypeConstructor<typeof grpc.Client, _user_UserServiceClient> & { service: _user_UserServiceDefinition }
  }
}


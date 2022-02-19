/* eslint-disable camelcase */
import * as protoLoader from '@grpc/proto-loader';
import * as grpcLibrary from '@grpc/grpc-js';
import Bluebird, { Promise } from 'bluebird';
import { ProtoGrpcType } from './proto/user';
import { USER_SERVICE_URL } from '../../config';
import { GetUserByIdRequest } from './proto/user/GetUserByIdRequest';
import { GetUserByIdResponse__Output } from './proto/user/GetUserByIdResponse';
import { GetUserByEmailRequest } from './proto/user/GetUserByEmailRequest';
import { GetUserByEmailResponse__Output } from './proto/user/GetUserByEmailResponse';
import { CreateUserRequest } from './proto/user/CreateUserRequest';
import { CreateUserResponse__Output } from './proto/user/CreateUserResponse';

const PROTO_PATH = `${__dirname}../../../../../microservices/user-service/user.proto`;
const protoLoaderConfig: protoLoader.Options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
};
const packageDefinition = protoLoader.loadSync(PROTO_PATH, protoLoaderConfig);
const packageObject = grpcLibrary.loadPackageDefinition(
  packageDefinition
) as unknown as ProtoGrpcType;
const userServiceClient = new packageObject.user.UserService(
  USER_SERVICE_URL,
  grpcLibrary.credentials.createInsecure()
);

const promisifyOptions = {
  context: userServiceClient
};

export interface IGrpcClient {
  getUserById: (
    arg1: GetUserByIdRequest
  ) => Bluebird<GetUserByIdResponse__Output>;

  getUserByEmail: (
    arg1: GetUserByEmailRequest
  ) => Bluebird<GetUserByEmailResponse__Output>;

  createUser: (arg1: CreateUserRequest) => Bluebird<CreateUserResponse__Output>;
}
export const grpcClient: IGrpcClient = {
  getUserById: Promise.promisify(
    userServiceClient.getUserById,
    promisifyOptions
  ),
  getUserByEmail: Promise.promisify(
    userServiceClient.getUserByEmail,
    promisifyOptions
  ),
  createUser: Promise.promisify(userServiceClient.createUser, promisifyOptions)
};

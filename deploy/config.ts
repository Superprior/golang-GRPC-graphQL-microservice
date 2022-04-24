import * as pulumi from '@pulumi/pulumi';
import AwsSSM from './aws/ssm';
const config = new pulumi.Config();

export const USER_SERVICE_CONTAINER_PORT = config.requireNumber(
  'user_service_container_port'
);
export const POST_SERVICE_CONTAINER_PORT = config.requireNumber(
  'post_service_container_port'
);
export const COMMENT_SERVICE_CONTAINER_PORT = config.requireNumber(
  'comment_service_container_port'
);
export const GATEWAY_SERVICE_CONTAINER_PORT = config.requireNumber(
  'gateway_service_container_port'
);
export const GATEWAY_SERVICE_HOST_PORT = config.requireNumber(
  'gateway_service_host_port'
);
export const KUBERNETES_SERVICE_PORT = config.requireNumber(
  'kubernetes_service_port'
);
export const GRAPHQL_PATH = config.require('graphql_path');
export const SALT_ROUNDS = AwsSSM.getParam('PASSWORD_SALT_ROUNDS');
export const SECRET_KEY = AwsSSM.getParam('JWT_SECRET_KEY');
export const JWT_ALGORITHM = config.require('jwt_algorithm');
export const JWT_EXPIRATION = config.require('jwt_expiration');
export const NODE_ENV = config.require('node_env');
export const DOMAIN_NAME = config.require('domain_name');

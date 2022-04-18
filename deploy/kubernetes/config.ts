import { buildServiceName } from './helper';
import {
  DeploymentConfig,
  ImageName,
  ImageType,
  ServiceConfig
} from '../types';
import * as config from '../config';

export const imageMap = new Map([
  [
    `${ImageName.USER_SERVICE}`,
    { name: ImageName.USER_SERVICE, type: ImageType.MICROSERVICE }
  ],
  [
    `${ImageName.POST_SERVICE}`,
    { name: ImageName.POST_SERVICE, type: ImageType.MICROSERVICE }
  ],
  [
    `${ImageName.COMMENT_SERVICE}`,
    { name: ImageName.COMMENT_SERVICE, type: ImageType.MICROSERVICE }
  ],
  [
    `${ImageName.GATEWAY_SERVICE}`,
    { name: ImageName.GATEWAY_SERVICE, type: ImageType.GATEWAY }
  ]
]);

const buildServiceUrl = (name: string, port: number, isGrpc: boolean) => {
  const serviceUrl = `${buildServiceName(name)}:${port}`;
  return isGrpc ? serviceUrl : `http://${serviceUrl}`;
};
export const deploymentInputs: Partial<DeploymentConfig>[] = [
  {
    name: ImageName.USER_SERVICE,
    ports: [{ containerPort: config.USER_SERVICE_CONTAINER_PORT }],
    env: []
  },
  {
    name: ImageName.POST_SERVICE,
    ports: [{ containerPort: config.POST_SERVICE_CONTAINER_PORT }],
    env: []
  },
  {
    name: ImageName.COMMENT_SERVICE,
    ports: [{ containerPort: config.COMMENT_SERVICE_CONTAINER_PORT }],
    env: []
  },
  {
    name: ImageName.GATEWAY_SERVICE,
    ports: [{ containerPort: config.GATEWAY_SERVICE_CONTAINER_PORT }],
    env: [
      { name: 'GRAPHQL_PATH', value: config.GRAPHQL_PATH },
      { name: 'SALT_ROUNDS', value: config.SALT_ROUNDS },
      { name: 'SECRET_KEY', value: config.SECRET_KEY },
      { name: 'JWT_ALGORITHM', value: config.JWT_ALGORITHM },
      { name: 'JWT_EXPIRATION', value: config.JWT_EXPIRATION },
      { name: 'NODE_ENV', value: config.NODE_ENV },
      {
        name: 'USER_SERVICE_URL',
        value: buildServiceUrl(
          ImageName.USER_SERVICE,
          config.KUBERNETES_SERVICE_PORT,
          true
        )
      },
      {
        name: 'POST_SERVICE_URL',
        value: buildServiceUrl(
          ImageName.POST_SERVICE,
          config.KUBERNETES_SERVICE_PORT,
          false
        )
      },
      {
        name: 'COMMENT_SERVICE_URL',
        value: buildServiceUrl(
          ImageName.COMMENT_SERVICE,
          config.KUBERNETES_SERVICE_PORT,
          false
        )
      }
    ]
  }
];
export const serviceInputs: Partial<ServiceConfig>[] = [
  {
    name: ImageName.USER_SERVICE,
    ports: [
      {
        port: config.KUBERNETES_SERVICE_PORT,
        targetPort: config.USER_SERVICE_CONTAINER_PORT
      }
    ]
  },
  {
    name: ImageName.POST_SERVICE,
    ports: [
      {
        port: config.KUBERNETES_SERVICE_PORT,
        targetPort: config.POST_SERVICE_CONTAINER_PORT
      }
    ]
  },
  {
    name: ImageName.COMMENT_SERVICE,
    ports: [
      {
        port: config.KUBERNETES_SERVICE_PORT,
        targetPort: config.COMMENT_SERVICE_CONTAINER_PORT
      }
    ]
  },
  {
    name: ImageName.GATEWAY_SERVICE,
    ports: [
      {
        port: config.KUBERNETES_SERVICE_PORT,
        targetPort: config.GATEWAY_SERVICE_CONTAINER_PORT
      }
    ]
  }
];

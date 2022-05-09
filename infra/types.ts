import * as docker from '@pulumi/docker';
import * as k8s from '@pulumi/kubernetes';
import * as eks from '@pulumi/eks';
import { Input } from '@pulumi/pulumi';

export enum ImageType {
  MICROSERVICE = 'microservice',
  GATEWAY = 'gateway'
}

export enum ImageName {
  USER_SERVICE = 'user-service',
  POST_SERVICE = 'post-service',
  COMMENT_SERVICE = 'comment-service',
  GATEWAY_SERVICE = 'gateway-service'
}

interface StackDefinition {
  stack: string;
}

export interface StackInput extends StackDefinition {
  timestamp: number;
}

export type ImageInput = StackInput & {
  name: ImageName;
  type: ImageType;
};

export type DeploymentConfig = {
  name: string;
  image: docker.Image;
  ports: Input<Input<k8s.types.input.core.v1.ContainerPort>[]>;
  env?: Input<Input<k8s.types.input.core.v1.EnvVar>[]>;
  cluster: eks.Cluster;
  namespace: k8s.core.v1.Namespace;
};

export type ServiceConfig = {
  name: string;
  ports: Input<Input<k8s.types.input.core.v1.ServicePort>[]>;
  cluster: eks.Cluster;
  namespace: k8s.core.v1.Namespace;
};

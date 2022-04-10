import * as docker from "@pulumi/docker";
import * as k8s from "@pulumi/kubernetes";
import { Input } from "@pulumi/pulumi";

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
    registry: docker.ImageRegistry;
}

export type ImageInput = StackInput & {
    name: ImageName;
    type: ImageType;
};

export type DeploymentConfig = {
    ports: Input<Input<k8s.types.input.core.v1.ContainerPort>[]>;
    env?: Input<Input<k8s.types.input.core.v1.EnvVar>[]>;
    image: docker.Image;
}

export type ServiceConfig = {
    ports: Input<Input<k8s.types.input.core.v1.ServicePort>[]>; 
}

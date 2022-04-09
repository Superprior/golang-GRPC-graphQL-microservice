import * as docker from "@pulumi/docker";

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

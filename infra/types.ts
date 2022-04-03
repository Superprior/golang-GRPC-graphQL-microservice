import * as docker from "@pulumi/docker";
import { Input } from "@pulumi/pulumi";

interface StackDefinition {
    stack: string;
}

export interface StackInput extends StackDefinition {
    timestamp: number;
}

export type ImageInput = StackInput & {
    name: string;
    context: string;
};

export interface PortsInput {
    host: number; 
    container: number;
}

interface ContainerPartialInput {
    network: docker.Network;
    name: string;
    ports: PortsInput;
    envs?: string[];
    dependsOn?: docker.Container[]
}

export type ContainerInput =  StackDefinition & ContainerPartialInput &{
    image: docker.Image;
    volumes?: Input<Input<docker.types.input.ContainerVolume>[]>;
}

export interface ContainerStackInput extends StackInput {
    network: docker.Network;
    dependsOn?: docker.Container[];
}

export enum ContainerType {
    MICROSERVICE = 'miroservice',
    GATEWAY = 'gateway'
}

export interface ContainerOutput {
    userServiceContainer: docker.Container;
    commentServiceContainer: docker.Container;
    postServiceContainer: docker.Container;
    gatewayServiceContainer: docker.Container;
}
import * as pulumi from "@pulumi/pulumi";
import * as docker from "@pulumi/docker";
import { UserServiceContainer, PostServiceContainer, CommentServiceContainer, GatewayServiceContainer } from './services'
import { ContainerOutput, StackInput, ContainerStackInput } from "../types";

const createNetwork = (stack: string)=> {
    const name = 'microservices-network';
    return new docker.Network(`${name}`, {
        name: `${name}-${stack}`,
    });
};

export const buildContainers = (input: StackInput): ContainerOutput =>{
    const network = createNetwork(input.stack);
    const containerStackInput: ContainerStackInput = { ...input, network };
    const userServiceContainer = new UserServiceContainer(containerStackInput).build();
    const postServiceContainer = new PostServiceContainer(containerStackInput).build();
    const commentServiceContainer = new CommentServiceContainer(containerStackInput).build();
    const gatewayServiceContainer = new GatewayServiceContainer({...containerStackInput, dependsOn: [userServiceContainer,postServiceContainer,commentServiceContainer]}).build();
    return { userServiceContainer, postServiceContainer, commentServiceContainer, gatewayServiceContainer };
};
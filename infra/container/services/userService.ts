import * as pulumi from "@pulumi/pulumi";
import * as docker from "@pulumi/docker";
import { ContainerStackInput, ContainerType } from "../../types";
import { Container } from '../container';
import { buildImageContext } from "../image";

const config = new pulumi.Config();
const hostPort = config.requireNumber('user_service_host_port');
const containerPort = config.requireNumber('user_service_container_port');

export class UserServiceContainer {
    constructor(private readonly containerStackInput: ContainerStackInput){}

    public build(): docker.Container {
        const { stack, timestamp, network } = this.containerStackInput;
        const name = 'user-service';
        return new Container()
                    .name(name)
                    .stack(stack)
                    .createdAt(timestamp)
                    .network(network)
                    .imageContext(buildImageContext(name, ContainerType.MICROSERVICE))
                    .ports({ host: hostPort, container: containerPort })
                    .build();
    }
}
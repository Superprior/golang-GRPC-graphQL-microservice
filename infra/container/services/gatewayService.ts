import * as pulumi from "@pulumi/pulumi";
import * as docker from "@pulumi/docker";
import { ContainerStackInput, ContainerType } from "../../types";
import { Container } from '../container';
import { buildImageContext } from "../image";

const config = new pulumi.Config();
const hostPort = config.requireNumber('gateway_service_host_port');
const containerPort = config.requireNumber('gateway_service_container_port');
const graphql_path = config.require('graphql_path');
const salt_rounds = config.requireNumber('salt_rounds');
const secret_key = config.require('secret_key');
const jwt_algorithm = config.require('jwt_algorithm');
const jwt_expiration = config.require('jwt_algorithm');
const is_development = config.requireBoolean('is_development');
const gateway_port = config.requireNumber('gateway_port');
const user_service_url = config.require('user_service_url');
const post_service_url = config.require('post_service_url');
const comment_service_url = config.require('comment_service_url');

const environmentVariables = [
    `GRAPHQL_PATH=${graphql_path}`,
    `SALT=${salt_rounds}`,
    `SECRET_KEY=${secret_key}`,
    `JWT_ALGORITHM=${jwt_algorithm}`,
    `JWT_EXPIRATION=${jwt_expiration}`,
    `IS_DEVELOPMENT=${is_development}`,
    `PORT=${gateway_port}`,
    `USER_SERVICE_URL=${user_service_url}`,
    `POST_SERVICE_URL=${post_service_url}`,
    `COMMENT_SERVICE_URL=${comment_service_url}`,
];

export class GatewayServiceContainer {
    constructor(private readonly containerStackInput: ContainerStackInput){}

    public build(): docker.Container {

        const { stack, timestamp, network, dependsOn } = this.containerStackInput;
        const name = 'api-gateway';
        const gateway_node_modules = new docker.Volume('gateway-node-modules');
        const volumes = [
            {
                volumeName: gateway_node_modules.name,
                containerPath: '/usr/src/gateway/node_modules',
            }
        ];

        return new Container()
                    .name(name)
                    .stack(stack)
                    .createdAt(timestamp)
                    .network(network)
                    .imageContext(buildImageContext(name, ContainerType.GATEWAY))
                    .ports({ host: hostPort, container: containerPort })
                    .environment(environmentVariables)
                    .dependsOn(dependsOn ?? [])
                    .volumes(volumes)
                    .build();
    }
}
import * as docker from '@pulumi/docker';
import * as k8s from "@pulumi/kubernetes";
import { DeploymentConfig, ServiceConfig, ImageName } from '../../types';
import { K8Service } from './k8Service';
import * as config from '../../config';
import { buildServiceName } from './helper';

const buildServiceUrl = (name: string, port: number, isGrpc: boolean)=> {
    const serviceUrl = `${buildServiceName(name)}:${port}`;
    return isGrpc ? serviceUrl : `http://${serviceUrl}`;
}

export class GatewayService {

    constructor(private readonly image: docker.Image){}

    public build(): k8s.core.v1.Service {
        const { image }  = this;
        const containerPort = config.GATEWAY_SERVICE_CONTAINER_PORT;
        const deploymentConfig: DeploymentConfig = { 
            image, 
            ports: [ { containerPort }],
            env: [
                { name: 'GRAPHQL_PATH', value: config.GRAPHQL_PATH },
                { name: 'SALT_ROUNDS', value: config.SALT_ROUNDS },
                { name: 'SECRET_KEY', value: config.SECRET_KEY },
                { name: 'JWT_ALGORITHM', value: config.JWT_ALGORITHM },
                { name: 'JWT_EXPIRATION', value: config.JWT_EXPIRATION },
                { name: 'NODE_ENV', value: config.NODE_ENV },
                { name: 'USER_SERVICE_URL', value: buildServiceUrl(ImageName.USER_SERVICE,config.KUBERNETES_SERVICE_PORT, true) },
                { name: 'POST_SERVICE_URL', value: buildServiceUrl(ImageName.POST_SERVICE,config.KUBERNETES_SERVICE_PORT, false) },
                { name: 'COMMENT_SERVICE_URL', value: buildServiceUrl(ImageName.POST_SERVICE,config.KUBERNETES_SERVICE_PORT, false) },
            ] 
        };
        const serviceConfig: ServiceConfig = { ports: [{ port: config.KUBERNETES_SERVICE_PORT, targetPort: containerPort }] }
        return new K8Service(ImageName.GATEWAY_SERVICE)
                    .setDeploymentConfig(deploymentConfig)
                    .setServiceConfig(serviceConfig)
                    .build();
    }
};

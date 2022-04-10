import * as docker from '@pulumi/docker';
import * as k8s from "@pulumi/kubernetes";
import { ImageName } from '../../types';
import { K8Service } from './k8Service';
import * as config from '../../config';

export class UserService {

    constructor(private readonly image: docker.Image){}

    public build(): k8s.core.v1.Service {
        const { image }  = this;
        const containerPort = config.USER_SERVICE_CONTAINER_PORT;
        const deploymentConfig = { image, ports: [ { containerPort }] };
        const serviceConfig = { ports: [{ port: config.KUBERNETES_SERVICE_PORT, targetPort: containerPort }] }
        return new K8Service(ImageName.USER_SERVICE)
                    .setDeploymentConfig(deploymentConfig)
                    .setServiceConfig(serviceConfig)
                    .build();
    }
};

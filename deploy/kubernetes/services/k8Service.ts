import * as k8s from "@pulumi/kubernetes";
import { Output } from "@pulumi/pulumi";
import { buildServiceName } from './helper';
import { DeploymentConfig, ServiceConfig } from "../../types";

export class K8Service {
    private deploymentConfig: DeploymentConfig = { } as DeploymentConfig;
    private serviceConfig: ServiceConfig = { } as ServiceConfig;
    private imageLabels: { app : string };
    private name: string;

    constructor(name: string){
        this.name = name;
        this.imageLabels = { app : name };
    }

    public setDeploymentConfig(config: DeploymentConfig){
        this.deploymentConfig = config;
        return this;
    }

    public setServiceConfig(config: ServiceConfig){
        this.serviceConfig = config;
        return this;
    }

    private buildDeployment(): k8s.apps.v1.Deployment{
        const { imageLabels, name, deploymentConfig: { image, ports, env = [] }  } = this;
        return new k8s.apps.v1.Deployment(`${name}-deployment`, {
            spec: {
                strategy: { type: "RollingUpdate" },
                selector: { matchLabels: imageLabels },
                replicas: 3,
                template: {
                    metadata: { labels: imageLabels },
                    spec: {
                        containers: [{
                            name,
                            image: image.imageName,
                            imagePullPolicy: 'Always',
                            ports,
                            env
                        }],
                    },
                },
            },
        });
    }

    private buildService(): k8s.core.v1.Service{
        const { name, imageLabels, serviceConfig: { ports } } = this;
        return new k8s.core.v1.Service(buildServiceName(name), {
            metadata: { labels: imageLabels },
            spec: {
                ports,
                selector: imageLabels,
            },
        });
    }

    public build(): k8s.core.v1.Service{
        this.buildDeployment();
        return this.buildService();
    }
}

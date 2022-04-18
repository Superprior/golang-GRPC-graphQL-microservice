import * as k8s from '@pulumi/kubernetes';
import { DeploymentConfig } from '../types';

const buildDeploymentName = (name: string) => `${name}-deployment`;

export const buildDeployment = (config: DeploymentConfig) => {
  const { name, image, ports, env = [], namespace, cluster } = config;
  const imageLabels = { app: name };
  const deploymentName = buildDeploymentName(name);
  return new k8s.apps.v1.Deployment(
    deploymentName,
    {
      metadata: {
        name: deploymentName,
        namespace: namespace.metadata.apply((nm) => nm.name)
      },
      spec: {
        strategy: { type: 'RollingUpdate' },
        selector: { matchLabels: imageLabels },
        replicas: 3,
        template: {
          metadata: { labels: imageLabels },
          spec: {
            containers: [
              {
                name,
                image: image.imageName,
                imagePullPolicy: 'Always',
                ports,
                env
              }
            ]
          }
        }
      }
    },
    { provider: cluster.provider }
  );
};

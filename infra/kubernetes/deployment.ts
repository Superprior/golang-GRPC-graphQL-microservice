import * as k8s from '@pulumi/kubernetes';
import { DeploymentConfig } from '../types';

export const buildDeployment = (config: DeploymentConfig) => {
  const { name, image, ports, env = [], namespace, cluster } = config;
  const imageLabels = { app: name };
  return new k8s.apps.v1.Deployment(
    `${name}-deployment`,
    {
      metadata: {
        name,
        namespace: namespace.metadata.apply((nm) => nm.name)
      },
      spec: {
        strategy: { type: 'RollingUpdate' },
        selector: { matchLabels: imageLabels },
        replicas: 2,
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

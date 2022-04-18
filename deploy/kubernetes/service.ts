import * as k8s from '@pulumi/kubernetes';
import { ServiceConfig } from '../types';

export const buildService = (config: ServiceConfig) => {
  const { name, namespace, ports, cluster } = config;
  const imageLabels = { app: name };

  return new k8s.core.v1.Service(
    `${name}-service`,
    {
      metadata: {
        name,
        namespace: namespace.metadata.apply((nm) => nm.name),
        labels: imageLabels
      },
      spec: {
        ports,
        selector: imageLabels
      }
    },
    { provider: cluster.provider }
  );
};

import * as k8s from '@pulumi/kubernetes';
import { ServiceConfig } from '../types';
import { buildServiceName } from './helper';

export const buildService = (config: ServiceConfig) => {
  const { name, namespace, ports, cluster } = config;
  const imageLabels = { app: name };
  const serviceName = buildServiceName(name);

  return new k8s.core.v1.Service(
    serviceName,
    {
      metadata: {
        name: serviceName,
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

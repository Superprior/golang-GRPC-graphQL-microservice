import * as eks from '@pulumi/eks';
import * as k8s from '@pulumi/kubernetes';
import * as pulumi from '@pulumi/pulumi';
export const createNamespace = (cluster: eks.Cluster) => {
  const name = `${pulumi.getProject()}-namespace`;
  return new k8s.core.v1.Namespace(
    name,
    {
      metadata: {
        name: name,
        labels: { 'app.kubernetes.io/name': 'aws-load-balancer-controller' }
      }
    },
    { provider: cluster.provider }
  );
};

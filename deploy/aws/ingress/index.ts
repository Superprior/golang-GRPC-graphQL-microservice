import * as pulumi from '@pulumi/pulumi';
import * as aws from '@pulumi/aws';
import * as eks from '@pulumi/eks';
import * as k8s from '@pulumi/kubernetes';
import { createIngressPolicy } from './policy';

const projectName = pulumi.getProject();

// Attach this policy to the NodeInstanceRole of the worker nodes.
const createNodeInstanceRole = (
  policy: aws.iam.Policy,
  cluster: eks.Cluster
) => {
  return new aws.iam.RolePolicyAttachment(
    `${projectName}-eks-NodeInstanceRole-policy-attach`,
    {
      policyArn: policy.arn,
      role: cluster.instanceRoles.apply((roles) => roles[0].name)
    }
  );
};

const createController = (cluster: eks.Cluster) => {
  const policy = createIngressPolicy();
  createNodeInstanceRole(policy, cluster);

  // Declare the ALBIngressController in 1 step with the Helm Chart.
  return new k8s.helm.v2.Chart(
    'alb',
    {
      chart:
        'http://storage.googleapis.com/kubernetes-charts-incubator/aws-alb-ingress-controller-0.1.9.tgz',
      values: {
        clusterName: cluster.eksCluster.name,
        autoDiscoverAwsRegion: 'true',
        autoDiscoverAwsVpcID: 'true'
      }
    },
    { provider: cluster.provider }
  );
};

const createIngress = (
  projectName: string,
  namespace: k8s.core.v1.Namespace,
  rules: pulumi.Input<
    pulumi.Input<k8s.types.input.networking.v1.IngressRule>[]
  >,
  cluster: eks.Cluster
) => {
  const ingressName = `${projectName}-ingress`;
  return new k8s.networking.v1.Ingress(
    ingressName,
    {
      metadata: {
        name: ingressName,
        namespace: namespace.metadata.apply((nm) => nm.name),
        annotations: {
          'kubernetes.io/ingress.class': 'alb',
          'alb.ingress.kubernetes.io/scheme': 'internet-facing',
          'alb.ingress.kubernetes.io/load-balancer-name': `${projectName}-load-balancer`,
          'alb.ingress.kubernetes.io/target-type': 'ip'
        },
        labels: { app: ingressName }
      },
      spec: { rules }
    },
    { provider: cluster.provider }
  );
};

const AwsIngress = {
  createController,
  createIngress
};

export default AwsIngress;

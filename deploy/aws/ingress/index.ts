import * as pulumi from '@pulumi/pulumi';
import * as aws from '@pulumi/aws';
import * as eks from '@pulumi/eks';
import * as awsx from '@pulumi/awsx';
import * as k8s from '@pulumi/kubernetes';
import * as config from '../../config';
import { createIngressPolicy } from './policy';

const projectName = pulumi.getProject();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const helmChartTransformation = (obj: any) => {
  if (obj['kind'] === 'CustomResourceDefinition') delete obj['status'];
};

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

export const createController = (cluster: eks.Cluster, vpc: awsx.ec2.Vpc) => {
  const policy = createIngressPolicy();
  createNodeInstanceRole(policy, cluster);

  // Declare the ALBIngressController in 1 step with the Helm Chart.
  return new k8s.helm.v3.Chart(
    'aws-load-balancer-controller',
    {
      chart: 'aws-load-balancer-controller',
      fetchOpts: {
        repo: 'https://aws.github.io/eks-charts'
      },
      values: {
        clusterName: cluster.eksCluster.name,
        // autoDiscoverAwsRegion: 'true',
        // autoDiscoverAwsVpcID: 'true',
        region: config.AWS_REGION,
        vpcId: vpc.id,
        podLabels: {
          stack: pulumi.getStack(),
          app: 'aws-lb-controller'
        }
      },
      transformations: [helmChartTransformation]
    },
    { provider: cluster.provider }
  );
};

export const createIngress = (
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

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

const AwsIngress = {
  createController
};

export default AwsIngress;

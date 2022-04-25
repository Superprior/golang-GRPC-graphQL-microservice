import * as pulumi from '@pulumi/pulumi';
import * as awsx from '@pulumi/awsx';
import * as eks from '@pulumi/eks';
import * as config from '../../config';

const projectName = pulumi.getProject();
const clusterName = `${projectName}-cluster`;
const clusterTag = `kubernetes.io/cluster/${clusterName}`;

export const createVpc = () =>
  new awsx.ec2.Vpc(`${projectName}-vpc-alb`, {
    cidrBlock: '172.16.0.0/24',
    subnets: [
      {
        type: 'private',
        tags: {
          [clusterTag]: 'owned',
          'kubernetes.io/role/internal-elb': '1'
        }
      },
      {
        type: 'public',
        tags: {
          [clusterTag]: 'owned',
          'kubernetes.io/role/elb': '1'
        }
      }
    ],
    tags: {
      Name: `${projectName}-vpc`
    }
  });
export const createCluster = (vpc: awsx.ec2.Vpc) => {
  return new eks.Cluster(clusterName, {
    vpcId: vpc.id,
    enabledClusterLogTypes: ['api', 'audit', 'controllerManager'],
    publicSubnetIds: vpc.publicSubnetIds,
    privateSubnetIds: vpc.privateSubnetIds,
    instanceType: 't2.medium',
    version: '1.20',
    nodeRootVolumeSize: 200,
    desiredCapacity: 3,
    maxSize: 4,
    minSize: 3,
    deployDashboard: false,
    vpcCniOptions: {
      warmIpTarget: 4
    },
    providerCredentialOpts: {
      profileName: config.AWS_PROFILE_NAME
    }
  });
};

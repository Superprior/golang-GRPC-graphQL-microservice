import * as pulumi from '@pulumi/pulumi';
import * as awsx from '@pulumi/awsx';
import * as eks from '@pulumi/eks';
import * as config from '../../config';

const projectName = pulumi.getProject();

const createVPC = () => new awsx.ec2.Vpc(`${projectName}-vpc-alb`, {});
export const createCluster = () => {
  const vpc = createVPC();
  return new eks.Cluster(`${projectName}-cluster`, {
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

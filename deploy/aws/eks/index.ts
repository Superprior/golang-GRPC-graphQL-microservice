import * as pulumi from '@pulumi/pulumi';
import * as awsx from '@pulumi/awsx';
import * as eks from '@pulumi/eks';

const projectName = pulumi.getProject();

const createVPC = () => new awsx.ec2.Vpc(`${projectName}-vpc-alb`, {});
const createCluster = () => {
  const vpc = createVPC();
  return new eks.Cluster(`${projectName}-cluster`, {
    vpcId: vpc.id,
    subnetIds: vpc.publicSubnetIds,
    instanceType: 't2.medium',
    version: '1.12',
    nodeRootVolumeSize: 200,
    desiredCapacity: 3,
    maxSize: 4,
    minSize: 3,
    deployDashboard: false,
    vpcCniOptions: {
      warmIpTarget: 4
    }
  });
};

const AwsEks = {
  createCluster
};
export default AwsEks;

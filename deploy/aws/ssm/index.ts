import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';

const getParam = (name: string) => {
  const promise = aws.ssm.getParameter({ name });
  return pulumi.output(promise).value;
};

const AwsSSM = {
  getParam
};

export default AwsSSM;

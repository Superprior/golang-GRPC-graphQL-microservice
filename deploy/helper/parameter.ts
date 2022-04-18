import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';

export function param(name: string) {
  const promise = aws.ssm.getParameter({ name });
  return pulumi.output(promise).value;
}

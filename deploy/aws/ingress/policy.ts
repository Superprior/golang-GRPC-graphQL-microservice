import * as aws from '@pulumi/aws';
import * as eks from '@pulumi/eks';
import * as k8s from '@pulumi/kubernetes';
import * as pulumi from '@pulumi/pulumi';

const projectName = pulumi.getProject();

// Create IAM Policy for the IngressController called "ingressController-iam-policy” and read the policy ARN.
export const createIngressPolicy = () => {
  return new aws.iam.Policy(`${projectName}-ingressController-iam-policy`, {
    policy: {
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Action: [
            'acm:DescribeCertificate',
            'acm:ListCertificates',
            'acm:GetCertificate'
          ],
          Resource: '*'
        },
        {
          Effect: 'Allow',
          Action: [
            'ec2:AuthorizeSecurityGroupIngress',
            'ec2:CreateSecurityGroup',
            'ec2:CreateTags',
            'ec2:DeleteTags',
            'ec2:DeleteSecurityGroup',
            'ec2:DescribeInstances',
            'ec2:DescribeInstanceStatus',
            'ec2:DescribeSecurityGroups',
            'ec2:DescribeSubnets',
            'ec2:DescribeTags',
            'ec2:DescribeVpcs',
            'ec2:ModifyInstanceAttribute',
            'ec2:ModifyNetworkInterfaceAttribute',
            'ec2:RevokeSecurityGroupIngress'
          ],
          Resource: '*'
        },
        {
          Effect: 'Allow',
          Action: [
            'elasticloadbalancing:AddTags',
            'elasticloadbalancing:CreateListener',
            'elasticloadbalancing:CreateLoadBalancer',
            'elasticloadbalancing:CreateRule',
            'elasticloadbalancing:CreateTargetGroup',
            'elasticloadbalancing:DeleteListener',
            'elasticloadbalancing:DeleteLoadBalancer',
            'elasticloadbalancing:DeleteRule',
            'elasticloadbalancing:DeleteTargetGroup',
            'elasticloadbalancing:DeregisterTargets',
            'elasticloadbalancing:DescribeListeners',
            'elasticloadbalancing:DescribeLoadBalancers',
            'elasticloadbalancing:DescribeLoadBalancerAttributes',
            'elasticloadbalancing:DescribeRules',
            'elasticloadbalancing:DescribeSSLPolicies',
            'elasticloadbalancing:DescribeTags',
            'elasticloadbalancing:DescribeTargetGroups',
            'elasticloadbalancing:DescribeTargetGroupAttributes',
            'elasticloadbalancing:DescribeTargetHealth',
            'elasticloadbalancing:ModifyListener',
            'elasticloadbalancing:ModifyLoadBalancerAttributes',
            'elasticloadbalancing:ModifyRule',
            'elasticloadbalancing:ModifyTargetGroup',
            'elasticloadbalancing:ModifyTargetGroupAttributes',
            'elasticloadbalancing:RegisterTargets',
            'elasticloadbalancing:RemoveTags',
            'elasticloadbalancing:SetIpAddressType',
            'elasticloadbalancing:SetSecurityGroups',
            'elasticloadbalancing:SetSubnets',
            'elasticloadbalancing:SetWebACL'
          ],
          Resource: '*'
        },
        {
          Effect: 'Allow',
          Action: ['iam:GetServerCertificate', 'iam:ListServerCertificates'],
          Resource: '*'
        },
        {
          Effect: 'Allow',
          Action: [
            'waf-regional:GetWebACLForResource',
            'waf-regional:GetWebACL',
            'waf-regional:AssociateWebACL',
            'waf-regional:DisassociateWebACL'
          ],
          Resource: '*'
        },
        {
          Effect: 'Allow',
          Action: ['tag:GetResources', 'tag:TagResources'],
          Resource: '*'
        },
        {
          Effect: 'Allow',
          Action: ['waf:GetWebACL'],
          Resource: '*'
        }
      ]
    }
  });
};

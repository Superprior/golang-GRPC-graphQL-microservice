import * as k8s from '@pulumi/kubernetes';
import * as aws from '@pulumi/aws';

const createAliasRecord = (
  ingressStatus: k8s.types.output.networking.v1.IngressStatus,
  domain: string
) => {
  const domainHostedZoneId = aws.route53
    .getZone({ name: domain }, { async: true })
    .then((zone) => zone.id);

  const albHostedZoneId = aws.elb.getHostedZoneId().then((zone) => zone.id);

  return new aws.route53.Record(domain, {
    name: domain,
    zoneId: domainHostedZoneId,
    type: 'A',
    aliases: [
      {
        name: ingressStatus.loadBalancer.ingress[0].hostname,
        zoneId: albHostedZoneId,
        evaluateTargetHealth: false
      }
    ]
  });
};

const AwsRoute53 = {
  createAliasRecord
};

export default AwsRoute53;

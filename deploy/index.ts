import * as pulumi from '@pulumi/pulumi';
import * as k8s from '@pulumi/kubernetes';
import * as aws from '@pulumi/aws';
import { createCluster } from './aws/eks';
import Image from './docker/image';
import { buildRegistry, buildRepository } from './aws/ecr';
import { createController, createIngress } from './aws/ingress';
import {
  buildDeployment,
  buildService,
  createNamespace,
  deploymentInputs,
  imageMap,
  serviceInputs
} from './kubernetes';
import { DeploymentConfig, ServiceConfig, StackInput } from './types';
import * as config from './config';

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

const projectName = pulumi.getProject();
const cluster = createCluster();
const namespace = createNamespace(cluster);
const ecrRepo = buildRepository(`${projectName}-repository`);
const ecrRegistry = buildRegistry(ecrRepo);
const stackInput: StackInput = {
  registry: ecrRegistry,
  timestamp: new Date().getTime(),
  stack: pulumi.getStack()
};

//Build Deployments
deploymentInputs.map((dep) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const imageConfig = imageMap.get(dep.name!)!;
  const image = Image.build({ ...imageConfig, ...stackInput });
  return buildDeployment({
    ...dep,
    image,
    cluster,
    namespace
  } as DeploymentConfig);
});

// Build Services
const [, , , gatewayService] = serviceInputs.map((serv) => {
  return buildService({ ...serv, namespace, cluster } as ServiceConfig);
});

const ingressRules = [
  {
    host: 'eseerigha.com',
    http: {
      paths: [
        {
          pathType: 'Prefix',
          path: '/graphql',
          backend: {
            service: {
              name: gatewayService.metadata.apply((service) => service.name),
              port: { number: config.KUBERNETES_SERVICE_PORT }
            }
          }
        }
      ]
    }
  }
];

// Build Ingress Controller
createController(cluster);

// Build Ingress
const ingress = createIngress(projectName, namespace, ingressRules, cluster);

// Create A record
export const aRecord = ingress.status.apply((s) =>
  createAliasRecord(s, config.DOMAIN_NAME)
);

// Export the cluster's kubeconfig.
export const kubeconfig = cluster.kubeconfig;

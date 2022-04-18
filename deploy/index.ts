import * as pulumi from '@pulumi/pulumi';
import * as k8s from '@pulumi/kubernetes';
import Image from './docker/image';
import AwsEcr from './aws/ecr';
import AwsEks from './aws/eks';
import AwsIngress from './aws/ingress';
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

const projectName = pulumi.getProject();
const cluster = AwsEks.createCluster();
const namespace = createNamespace(cluster);
const ecrRepo = AwsEcr.buildRepository(`${projectName}-repository`);
const ecrRegistry = AwsEcr.buildRegistry(ecrRepo);
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

// Build Ingress Controller
AwsIngress.createController(cluster);

// Build Ingress
new k8s.networking.v1.Ingress(
  'ingress-game',
  {
    metadata: {
      name: '2048-ingress',
      namespace: '2048-game',
      annotations: {
        'kubernetes.io/ingress.class': 'alb',
        'alb.ingress.kubernetes.io/scheme': 'internet-facing'
      },
      labels: { app: '2048-ingress' }
    },
    spec: {
      rules: [
        {
          host: 'eseerigha.com',
          http: {
            paths: [
              {
                pathType: 'Prefix',
                path: '/graphql',
                backend: {
                  service: {
                    name: gatewayService.metadata.apply(
                      (service) => service.name
                    ),
                    port: { number: config.KUBERNETES_SERVICE_PORT }
                  }
                }
              }
            ]
          }
        }
      ]
    }
  },
  { provider: cluster.provider }
);

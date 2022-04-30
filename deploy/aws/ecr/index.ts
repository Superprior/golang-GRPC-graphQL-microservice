import * as aws from '@pulumi/aws';
import { Input } from '@pulumi/pulumi';
import { ImageName } from '../../types';

const buildRepositoryPolicy = (
  projectName: string,
  repo: aws.ecr.Repository
) => {
  // Set a use policy for the repository
  return new aws.ecr.RepositoryPolicy(`${projectName}-ecr-repository-policy`, {
    repository: repo.name.apply((name) => name),
    policy: {
      Version: '2012-10-17',
      Statement: [
        {
          Sid: 'ECR policy',
          Effect: 'Allow',
          Principal: '*',
          Action: [
            'ecr:GetDownloadUrlForLayer',
            'ecr:BatchGetImage',
            'ecr:BatchCheckLayerAvailability',
            'ecr:PutImage',
            'ecr:InitiateLayerUpload',
            'ecr:UploadLayerPart',
            'ecr:CompleteLayerUpload',
            'ecr:DescribeRepositories',
            'ecr:GetRepositoryPolicy',
            'ecr:ListImages',
            'ecr:DeleteRepository',
            'ecr:BatchDeleteImage',
            'ecr:SetRepositoryPolicy',
            'ecr:DeleteRepositoryPolicy'
          ]
        }
      ]
    }
  });
};

const buildImageLifecyclePolicy = (
  projectName: string,
  repo: aws.ecr.Repository
) => {
  const imageTags = [
    ImageName.USER_SERVICE,
    ImageName.POST_SERVICE,
    ImageName.COMMENT_SERVICE,
    ImageName.GATEWAY_SERVICE
  ];
  const rules = imageTags.map((tag) => ({
    rulePriority: 1,
    description: 'Keep only two tagged image, expire all others',
    selection: {
      tagStatus: 'tagged' as Input<'tagged' | 'untagged' | 'any'>,
      tagPrefixList: [tag],
      countType: 'imageCountMoreThan' as Input<
        'imageCountMoreThan' | 'sinceImagePushed'
      >,
      countNumber: 2
    },
    action: {
      type: 'expire' as Input<'expire'>
    }
  }));

  // Set a policy to control the lifecycle of an image
  new aws.ecr.LifecyclePolicy(`${projectName}-ecr-lifecycle-policy`, {
    repository: repo.name.apply((name) => name),
    policy: {
      rules
    }
  });
};

export const buildRegistry = (repo: aws.ecr.Repository) => {
  // Get the repository credentials we use to push to the repository
  return repo.registryId.apply(async (registryId) => {
    const credentials = await aws.ecr.getCredentials({
      registryId: registryId
    });
    const decodedCredentials = Buffer.from(
      credentials.authorizationToken,
      'base64'
    ).toString();
    const [username, password] = decodedCredentials.split(':');
    return { server: credentials.proxyEndpoint, username, password };
  });
};

export const buildRepository = (projectName: string) => {
  const repo = new aws.ecr.Repository(`${projectName}-repository`, {
    imageScanningConfiguration: {
      scanOnPush: true
    },
    imageTagMutability: 'MUTABLE'
  });
  buildRepositoryPolicy(projectName, repo);
  buildImageLifecyclePolicy(projectName, repo);
  return repo;
};

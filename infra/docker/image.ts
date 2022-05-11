import * as path from 'path';
import * as docker from '@pulumi/docker';
import { ImageInput, ImageType } from '../types';

const buildContext = (name: string, type: ImageType) => {
  const imagePath =
    type === ImageType.MICROSERVICE
      ? `../../microservices/${name}`
      : `../../api-gateway`;
  return path.resolve(__dirname, imagePath);
};

export const buildImage = (input: ImageInput) => {
  const { stack, timestamp, name, type, repo } = input;
  const repoUrl = repo.repositoryUrl.apply((url) => url);
  const context = buildContext(name, type);
  return new docker.Image(`${name}`, {
    build: {
      context,
      extraOptions: ['--quiet'] // Fixes https://github.com/pulumi/pulumi-docker/issues/289
    },
    imageName: `${repoUrl}:${name}-${stack}-${timestamp}`
  });
};

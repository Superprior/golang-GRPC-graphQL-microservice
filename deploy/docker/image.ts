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

const build = (input: ImageInput) => {
  const { stack, timestamp, name, registry, type } = input;
  const context = buildContext(name, type);
  return new docker.Image(`${name}`, {
    build: {
      context
    },
    imageName: `${stack}:${name}-${timestamp}`,
    registry
  });
};
const Image = {
  build
};

export default Image;

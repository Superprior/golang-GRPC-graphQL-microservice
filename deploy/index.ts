import * as pulumi from '@pulumi/pulumi';
import * as k8s from "@pulumi/kubernetes";
import Image from './docker/image';
import AwsEcr from './aws/ecr';
import { ImageName, ImageType, StackInput } from './types';

const ecrRepo = AwsEcr.buildRepository('project-tango');
const ecrRegistry = AwsEcr.buildRegistry(ecrRepo);
const stackInput: StackInput = {
    registry: ecrRegistry,
    timestamp: new Date().getTime(),
    stack: pulumi.getStack(),
};

const userServiceImage =  Image.build({ ...stackInput, name: ImageName.USER_SERVICE, type: ImageType.MICROSERVICE });
const commentServiceImage =  Image.build({ ...stackInput, name: ImageName.COMMENT_SERVICE, type: ImageType.MICROSERVICE });
const postServiceImage =  Image.build({ ...stackInput, name: ImageName.POST_SERVICE, type: ImageType.MICROSERVICE });
const gatewayServiceImage =  Image.build({ ...stackInput, name: ImageName.GATEWAY_SERVICE, type: ImageType.GATEWAY });


const appLabels = { app: "myapp" };
const appDep = new k8s.apps.v1.Deployment("app-dep", {
    spec: {
        selector: { matchLabels: appLabels },
        replicas: 3,
        template: {
            metadata: { labels: appLabels },
            spec: {
                containers: [{
                    name: ImageName.USER_SERVICE,
                    image: userServiceImage.imageName,
                    imagePullPolicy: 'Always'
                }],
            },
        },
    },
});





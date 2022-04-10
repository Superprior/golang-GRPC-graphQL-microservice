import * as pulumi from '@pulumi/pulumi';
import Image from './docker/image';
import AwsEcr from './aws/ecr';
import { UserService, PostService, CommentService, GatewayService } from './kubernetes';
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

const userService = new UserService(userServiceImage).build();
const postService = new PostService(postServiceImage).build();
const commentService = new CommentService(commentServiceImage).build();
const gatewayService = new GatewayService(gatewayServiceImage).build();





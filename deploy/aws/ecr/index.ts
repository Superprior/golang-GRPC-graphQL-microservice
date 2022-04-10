import * as aws from "@pulumi/aws";
import { ImageName } from "../../types";

const buildRepositoryPolicy = (repo: aws.ecr.Repository) => {
    // Set a use policy for the repository
    const repositoryPolicy = new aws.ecr.RepositoryPolicy(`${repo.name}-policy`, {
        repository: repo.id,
        policy: JSON.stringify({
            Version: "2012-10-17",
            Statement: [{
                Sid: "new policy",
                Effect: "Allow",
                Principal: "*",
                Action: [
                    "ecr:GetDownloadUrlForLayer",
                    "ecr:BatchGetImage",
                    "ecr:BatchCheckLayerAvailability",
                    "ecr:PutImage",
                    "ecr:InitiateLayerUpload",
                    "ecr:UploadLayerPart",
                    "ecr:CompleteLayerUpload",
                    "ecr:DescribeRepositories",
                    "ecr:GetRepositoryPolicy",
                    "ecr:ListImages",
                    "ecr:DeleteRepository",
                    "ecr:BatchDeleteImage",
                    "ecr:SetRepositoryPolicy",
                    "ecr:DeleteRepositoryPolicy"
                ]
            }]
        })
    });
};

const buildImageLifecyclePolicy = (repo: aws.ecr.Repository)=>{

    const imageTags = [ImageName.USER_SERVICE, ImageName.POST_SERVICE, ImageName.COMMENT_SERVICE, ImageName.GATEWAY_SERVICE];
    const rules = imageTags.map((tag)=>({
        rulePriority: 1,
        description: "Keep only two tagged image, expire all others",
        selection: {
            "tagStatus": "tagged",
            "tagPrefixList": [tag],
            "countType": "imageCountMoreThan",
            "countNumber": 2
        },
        action: {
            type: "expire"
        }
    }));

    // Set a policy to control the lifecycle of an image
    new aws.ecr.LifecyclePolicy(`${repo.name}-lifecyclepolicy`, {
        repository: repo.id,
        policy: JSON.stringify({ rules })
    });
}

const buildRegistry = (repo: aws.ecr.Repository)=>{
    // Get the repository credentials we use to push to the repository
    return repo.registryId.apply(async (registryId) => {
        const credentials = await aws.ecr.getCredentials({
            registryId: registryId,
        });
        const decodedCredentials = Buffer.from(credentials.authorizationToken, "base64").toString();
        const [username, password] = decodedCredentials.split(":");
        return { server: credentials.proxyEndpoint, username, password };
    });
}
const buildRepository = (name: string)=> {
    const repo = new aws.ecr.Repository(name, {
        imageScanningConfiguration: {
            scanOnPush: true
        },
        imageTagMutability: "MUTABLE",
    });
    buildRepositoryPolicy(repo);
    buildImageLifecyclePolicy(repo);
    return repo;
};

const AwsEcr = {
    buildRepository,
    buildRegistry
}

export default AwsEcr;
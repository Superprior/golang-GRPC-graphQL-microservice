import * as pulumi from "@pulumi/pulumi";
import { buildContainers } from './infra/container';

const provisionResources = ()=>{
    const timestamp = new Date().getTime();
    const stack = pulumi.getStack();
    const containers = buildContainers({ stack, timestamp });
};

provisionResources();

import { ContainerType } from "../types";

export const buildImageContext = (name: string, containerType: ContainerType)=> {
    return containerType === ContainerType.GATEWAY ? `${process.cwd()}/${name}`: `${process.cwd()}/microservices/${name}`;
};
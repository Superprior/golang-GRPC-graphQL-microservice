import * as docker from "@pulumi/docker";
import { Input } from "@pulumi/pulumi";
import { ImageInput, ContainerInput, PortsInput } from "../types";

export class Container {

    private imageInput: ImageInput =  {} as ImageInput;
    private containerInput: ContainerInput = {} as ContainerInput;

    constructor(){}

    public stack(stack: string){
        this.imageInput.stack = stack;
        this.containerInput.stack = stack;
        return this;
    }

    public createdAt(timestamp: number){
        this.imageInput.timestamp = timestamp;
        return this;
    }

    public network(network: docker.Network){
        this.containerInput.network = network;
        return this;
    }

    public name(name:string){
        this.imageInput.name = name;
        this.containerInput.name = name;
        return this;
    }

    public imageContext(context: string){
        this.imageInput.context = context
        return this;
    }

    public ports(ports: PortsInput){
        this.containerInput.ports = ports;
        return this;
    }

    public environment(envs: string[]){
        this.containerInput.envs = envs;
        return this;
    }

    public dependsOn(containers: docker.Container[]){
        this.containerInput.dependsOn = containers;
        return this;
    }

    public volumes(volumes: Input<Input<docker.types.input.ContainerVolume>[]>){
        this.containerInput.volumes = volumes;
        return this;
    }

    private buildImage(params: ImageInput){
        const { stack, timestamp, name, context  } = params;
        return new docker.Image(`${name}`, {
            build: {
                context,
            },
            imageName: `${name}:${stack}:${timestamp}`,
            skipPush: true,
        });
    }

    private buildContainer(containerInput: ContainerInput){
        const { name, ports, stack, image, network, envs = [], dependsOn = [], volumes = [] } = containerInput;
        return new docker.Container(`${name}`, {
            name: `${name}-${stack}`,
            image: image.baseImageName,
            ports: [
                {
                    internal: ports.container,
                    external: ports.host,
                },
            ],
            networksAdvanced: [
                {
                    name: network.name,
                },
            ],
            envs,
            volumes
        }, { dependsOn });
    }

    public build(){

        const image = this.buildImage(this.imageInput);
        return this.buildContainer({...this.containerInput, image});
    }
}
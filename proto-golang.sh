#!/bin/bash

set -e

packs=(
    "user"
);

# Generate go protobuf files for user proto in golang
for d in ${packs[@]} ; do
    echo "Compiling $d";
    protoc -I "microservices/$d-service" \
            --go_out="microservices/$d-service/$d" --go_opt=paths=source_relative \
            --go-grpc_out="microservices/$d-service/$d" --go-grpc_opt=paths=source_relative \
            "microservices/$d-service/$d.proto"
done

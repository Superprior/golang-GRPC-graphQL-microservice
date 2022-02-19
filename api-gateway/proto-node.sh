#!/bin/bash
base_dir="src/graphql/user"
proto_dir="proto"
(cd $base_dir && mkdir -p $proto_dir)
yarn proto-loader-gen-types --grpcLib=@grpc/grpc-js --outDir="$base_dir/$proto_dir/" "../microservices/user-service/user.proto"

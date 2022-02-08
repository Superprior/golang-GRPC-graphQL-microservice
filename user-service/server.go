package main

import (
	"log"
	"net"

	"github.com/ese-erigha/grpc-graphql-kubernetes-microservice/user"
	"google.golang.org/grpc"
)

func main() {

	listener, err := net.Listen("tcp", ":9000")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	userServer := user.Server{}

	grpcServer := grpc.NewServer()
	user.RegisterUserServiceServer(grpcServer, &userServer)

	if err := grpcServer.Serve(listener); err != nil {
		log.Fatalf("failed to serve: %s", err)
	}
}

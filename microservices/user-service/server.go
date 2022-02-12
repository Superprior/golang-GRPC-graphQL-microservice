package main

import (
	"fmt"
	"log"
	"net"

	"github.com/grpc-graphql-kubernetes-microservice/microservices/user-service/user"
	"google.golang.org/grpc"
)

func main() {

	port := 9000

	listener, err := net.Listen("tcp", fmt.Sprintf(":%d", port))

	if err != nil {
		log.Fatal(err)
	}

	userServer := user.Server{}

	grpcServer := grpc.NewServer()

	user.RegisterUserServiceServer(grpcServer, &userServer)

	if err := grpcServer.Serve(listener); err != nil {
		log.Fatal(err)
	}
}

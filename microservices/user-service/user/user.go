package user

import (
	"log"

	"golang.org/x/net/context"
)

type Server struct {
	// Embed the unimplemented server from user_grpc.pb.go
	UnimplementedUserServiceServer
}

func (s *Server) CreateUser(ctx context.Context, input *CreateUserRequest) (*CreateUserResponse, error) {
	log.Println("createUser Called")
	return &CreateUserResponse{}, nil
}

func (s *Server) GetUserById(ctx context.Context, input *GetUserByIdRequest) (*GetUserByIdResponse, error) {
	log.Println("createUser Called")
	return &GetUserByIdResponse{}, nil
}

func (s *Server) GetUserByEmail(ctx context.Context, input *GetUserByEmailRequest) (*GetUserByEmailResponse, error) {
	log.Println("createUser Called")
	return &GetUserByEmailResponse{}, nil
}

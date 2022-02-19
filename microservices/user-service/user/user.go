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
	log.Println("CreateUser Called")
	createUserInput := CreateUserInput{name: input.GetName(), email: input.GetEmail(), password: input.GetPassword()}
	createdUser := UserRepository{}.CreateUser(createUserInput)
	return &CreateUserResponse{Data: &CreateUserData{User: mapUserDtoToUser(createdUser)}}, nil
}

func (s *Server) GetUserById(ctx context.Context, input *GetUserByIdRequest) (*GetUserByIdResponse, error) {
	log.Println("GetUserById Called")
	user := UserRepository{}.GetUserById(input.Id)
	if user.IsEmpty() {
		return &GetUserByIdResponse{Data: &GetUserByIdData{}}, nil
	}
	return &GetUserByIdResponse{Data: &GetUserByIdData{User: mapUserDtoToUser(user)}}, nil
}

func (s *Server) GetUserByEmail(ctx context.Context, input *GetUserByEmailRequest) (*GetUserByEmailResponse, error) {
	log.Println("GetUserByEmail Called")
	user := UserRepository{}.GetUserById(input.Email)
	if user.IsEmpty() {
		return &GetUserByEmailResponse{Data: &GetUserByEmailData{}}, nil
	}
	return &GetUserByEmailResponse{Data: &GetUserByEmailData{User: mapUserDtoToUser(user)}}, nil
}

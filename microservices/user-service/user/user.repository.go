package user

import (
	"github.com/google/uuid"
)

type CreateUserInput struct {
	name     string
	email    string
	password string
}

type IUserRepository interface {
	CreateUser(input CreateUserInput) (UserDto, error)
	GetUserById(id string) (UserDto, error)
	GetUserByEmail(email string) (UserDto, error)
}

type UserRepository struct{}

var users []UserDto

func (userRepository UserRepository) CreateUser(input CreateUserInput) UserDto {
	user := UserDto{id: uuid.New().String(), name: input.name, email: input.email, password: input.password}
	users = append(users, user)
	return user
}

func (userRepository UserRepository) GetUserById(id string) UserDto {
	user := FindById(users, id)
	return user
}

func (userRepository UserRepository) GetUserByEmail(email string) UserDto {
	user := FindByEmail(users, email)
	return user
}

package user

import reflect "reflect"

type UserDto struct {
	id       string
	name     string
	email    string
	password string
}

func (u UserDto) IsEmpty() bool {
	return reflect.DeepEqual(u, UserDto{})
}

func mapUserDtoToUser(userDto UserDto) *User {
	return &User{Id: userDto.id, Name: userDto.name, Email: userDto.email, Password: userDto.password}
}

package user

func FindById(users []UserDto, id string) UserDto {
	for _, n := range users {
		if id == n.id {
			return n
		}
	}
	return UserDto{}
}

func FindByEmail(users []UserDto, email string) UserDto {
	for _, n := range users {
		if email == n.email {
			return n
		}
	}
	return UserDto{}
}

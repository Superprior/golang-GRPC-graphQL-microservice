import { createUnionType } from 'type-graphql';
import { User } from '../user';
import { InvalidLogin } from './dto/invalid-login.model';
import { LoginResult } from './dto/login.result';
import { DuplicateUser } from './dto/duplicate-user.model';

export const LoginResponse = createUnionType({
  name: 'LoginResponse', // the name of the GraphQL union
  types: () => [LoginResult, InvalidLogin] as const,
  resolveType: (value) => {
    if ('accessToken' in value) {
      return LoginResult; // we can return object type class (the one with `@ObjectType()`)
    }
    if ('code' in value) {
      return InvalidLogin; // or the schema name of the type as a string
    }
    return undefined;
  }
});

export const RegisterResponse = createUnionType({
  name: 'RegisterResponse', // the name of the GraphQL union
  types: () => [User, DuplicateUser] as const,
  resolveType: (value) => {
    if ('id' in value) {
      return User;
    }
    if ('code' in value) {
      return DuplicateUser; // or the schema name of the type as a string
    }
    return undefined;
  }
});

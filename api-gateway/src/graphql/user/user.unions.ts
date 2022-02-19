import { createUnionType } from 'type-graphql';
import { UserNotFound } from './dto/user-not-found.model';
import { User } from './user.model';

export const UserResponse = createUnionType({
  name: 'UserResponse', // the name of the GraphQL union
  types: () => [User, UserNotFound] as const,
  resolveType: (value) => {
    if ('id' in value) {
      return User; // we can return object type class (the one with `@ObjectType()`)
    }
    if ('code' in value) {
      return UserNotFound; // or the schema name of the type as a string
    }
    return undefined;
  }
});

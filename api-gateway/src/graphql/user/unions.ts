import { createUnionType } from 'type-graphql';
import { UserNotFoundError } from './user-not-found-error.model';
import { User } from './user.model';

export const UserResultUnion = createUnionType({
  name: 'UserResult', // the name of the GraphQL union
  types: () => [User, UserNotFoundError] as const,
  resolveType: (value) => {
    if ('id' in value) {
      return User; // we can return object type class (the one with `@ObjectType()`)
    }
    if ('code' in value) {
      return UserNotFoundError; // or the schema name of the type as a string
    }
    return undefined;
  }
});

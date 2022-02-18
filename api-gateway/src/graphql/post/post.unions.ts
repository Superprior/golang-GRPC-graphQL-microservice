import { createUnionType } from 'type-graphql';
import { PostNotFoundError } from './model/post-not-found.error.model';
import { Post } from './model/post.model';

export const PostResultUnion = createUnionType({
  name: 'PostResult', // the name of the GraphQL union
  types: () => [Post, PostNotFoundError] as const,
  resolveType: (value) => {
    if ('id' in value) {
      return Post; // we can return object type class (the one with `@ObjectType()`)
    }
    if ('code' in value) {
      return PostNotFoundError; // or the schema name of the type as a string
    }
    return undefined;
  }
});

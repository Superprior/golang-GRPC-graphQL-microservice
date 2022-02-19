import { createUnionType } from 'type-graphql';
import { PostNotFound } from './model/post-not-found.model';
import { Post } from './model/post.model';

export const PostResponse = createUnionType({
  name: 'PostResponse', // the name of the GraphQL union
  types: () => [Post, PostNotFound] as const,
  resolveType: (value) => {
    if ('id' in value) {
      return Post; // we can return object type class (the one with `@ObjectType()`)
    }
    if ('code' in value) {
      return PostNotFound; // or the schema name of the type as a string
    }
    return undefined;
  }
});

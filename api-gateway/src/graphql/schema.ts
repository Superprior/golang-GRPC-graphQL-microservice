import { buildSchema } from 'type-graphql';
import { GraphQLSchema } from 'graphql';
import { PostConnectionResolver, PostResolver } from './post';
import { UserResolver } from './user';
import { CommentResolver } from './comment';
import { AuthenticationResolver } from './authentication';
import container from '../inversify/inversify.config';

export default async function buildGraphQLSchema(): Promise<GraphQLSchema> {
  const resolvers = [
    PostResolver,
    PostConnectionResolver,
    UserResolver,
    CommentResolver,
    AuthenticationResolver
  ] as const;

  const schema = await buildSchema({
    resolvers,
    container
  });
  return schema;
}

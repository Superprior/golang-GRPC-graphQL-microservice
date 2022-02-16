import { buildSchema } from 'type-graphql';
import { GraphQLSchema } from 'graphql';
import { Container } from 'typedi';
import { PostResolver } from './post';
import { UserResolver } from './user';
import { CommentResolver } from './comment';
import { AuthenticationResolver } from './authentication';
import { authChecker } from './middleware';

export default async function buildGraphQLSchema(): Promise<GraphQLSchema> {
  const resolvers = [
    PostResolver,
    UserResolver,
    CommentResolver,
    AuthenticationResolver
  ] as const;

  const schema = await buildSchema({
    resolvers,
    container: Container,
    authChecker
  });
  return schema;
}

import { GraphQLSchema } from 'graphql';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import MovieConnectionResolver from './resolvers/movieConnection';
import MovieListResolver from './resolvers/post';
import MovieListConnectionResolver from './resolvers/movieListConnection';
import UserResolver from './resolvers/user';

export default async function buildGraphQLSchema(): Promise<GraphQLSchema> {
  const resolvers = [
    MovieListResolver,
    MovieListConnectionResolver,
    MovieConnectionResolver,
    UserResolver
  ] as const;

  const schema = await buildSchema({
    resolvers,
    container: Container
  });
  return schema;
}

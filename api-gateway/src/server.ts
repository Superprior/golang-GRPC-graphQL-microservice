import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import Express from 'express';
import buildSchema from './graphql/schema';
import middleware, { logger } from './middleware';
import { GRAPHQL_PATH, IS_DEVELOPMENT, PORT } from './constants';
import GraphQLContext from './graphql/graphqlContext';

const port = process.env.PORT || PORT;

(async () => {
  const schema = await buildSchema();
  const app = Express();
  const apolloServer = new ApolloServer({
    schema,
    introspection: IS_DEVELOPMENT,
    context: (ctx) => GraphQLContext.build(ctx)
  });

  middleware(app);
  await apolloServer.start();

  apolloServer.applyMiddleware({ app, path: GRAPHQL_PATH });

  // Launch the express server
  app.listen({ port }, () =>
    logger.info(
      `🚀 Server ready at http://localhost:${port}${apolloServer.graphqlPath}`
    )
  );
})();

import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import Express from 'express';
import buildSchema from './graphql/schema';
import middleware from './middleware';
import { logger } from './middleware/logger';
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
  apolloServer.applyMiddleware({ app });

  // Start the server
  app.listen(port, () => {
    logger.info(`🚀 Server is running at http://localhost:${port}`);

    logger.info(
      `🚀 GraphQL Server is running at http://localhost:${port}${GRAPHQL_PATH}`
    );
  });
})();

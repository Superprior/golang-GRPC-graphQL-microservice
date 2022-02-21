import 'reflect-metadata';
import 'dotenv/config';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerLoaderPlugin } from 'type-graphql-dataloader';
import Express from 'express';
import buildSchema from './graphql/schema';
import middleware, { logger } from './middleware';
import GraphQLContext from './graphql/graphql.context';
import { PORT, IS_DEVELOPMENT, GRAPHQL_PATH } from './config';

const port = PORT;

(async () => {
  const schema = await buildSchema();
  const app = Express();
  const apolloServer = new ApolloServer({
    schema,
    plugins: [ApolloServerLoaderPlugin({})],
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

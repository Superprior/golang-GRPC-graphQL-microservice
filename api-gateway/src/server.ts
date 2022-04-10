import 'reflect-metadata';
import 'dotenv/config';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerLoaderPlugin } from 'type-graphql-dataloader';
import Express from 'express';
import buildSchema from './graphql/schema';
import middleware, { logger } from './middleware';
import GraphQLContext from './graphql/graphql.context';
import { PORT, NODE_ENV, GRAPHQL_PATH } from './config';

const port = PORT;
const hostname = '0.0.0.0';

(async () => {
  const schema = await buildSchema();
  const app = Express();
  const apolloServer = new ApolloServer({
    schema,
    plugins: [ApolloServerLoaderPlugin({})],
    introspection: NODE_ENV === 'development',
    context: (ctx) => GraphQLContext.build(ctx)
  });

  middleware(app);
  await apolloServer.start();

  apolloServer.applyMiddleware({ app, path: GRAPHQL_PATH });

  // Launch the express server
  app.listen(port, hostname, () =>
    logger.info(
      `🚀 Server ready at http://localhost:${port}${apolloServer.graphqlPath}`
    )
  );
})();

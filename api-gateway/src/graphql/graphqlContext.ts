import { ExpressContext } from 'apollo-server-express';
import { User } from './user';

export interface GraphqlContext extends ExpressContext {
  user?: User;
}

export default class GraphQLContext {
  static build(appContext: ExpressContext) {
    const { req } = appContext;
    const { user } = req; // `req.user` comes from `express-jwt and contains the JWT decoded payload`
    const context = {
      ...appContext,
      user
    } as GraphqlContext;
    return context;
  }
}

import { ExpressContext } from 'apollo-server-express';
import User from './models/user';

export interface GraphqlContext extends ExpressContext {
  user: User;
}

export default class GraphQLContext {
  static build(appContext: ExpressContext) {
    const { req } = appContext;
    const context = {
      ...appContext,
      user: req.user // `req.user` comes from `express-jwt and contains the JWT decoded payload`
    } as GraphqlContext;
    return context;
  }
}

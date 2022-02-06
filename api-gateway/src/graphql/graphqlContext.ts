import { ExpressContext } from 'apollo-server-express';
import { logger } from '../middleware/logger';
import { User } from './user';

export interface GraphqlContext extends ExpressContext {
  user: User;
}

export default class GraphQLContext {
  static build(appContext: ExpressContext) {
    const { req } = appContext;
    logger.info('context user');
    logger.info({ user: req.user });
    const context = {
      ...appContext,
      user: req.user // `req.user` comes from `express-jwt and contains the JWT decoded payload`
    } as GraphqlContext;
    return context;
  }
}

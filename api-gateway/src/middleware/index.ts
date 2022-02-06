import Express from 'express';
import loggerMiddleware from './logger';
import authentication from './authentication';
import { GRAPHQL_PATH } from '../constants';

export { logger } from './logger';

const middleware = (app: Express.Application) => {
  app.use(loggerMiddleware);
  app.use(GRAPHQL_PATH, authentication);
};

export default middleware;

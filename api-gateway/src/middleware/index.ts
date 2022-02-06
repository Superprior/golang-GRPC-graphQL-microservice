import Express from 'express';
import loggerMiddleware from './logger';
import jwtParser from './jwt.parser';
import { GRAPHQL_PATH } from '../constants';

export { logger } from './logger';

const middleware = (app: Express.Application) => {
  app.use(loggerMiddleware);
  app.use(GRAPHQL_PATH, jwtParser);
};

export default middleware;

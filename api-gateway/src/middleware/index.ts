import Express from 'express';
import loggerMiddleware from './logger';
import jwtDecode from './jwt.decode';
import authenticationErrorInterceptor from './auth.error.interceptor';
import { GRAPHQL_PATH } from '../config';

export { logger } from './logger';

const middleware = (app: Express.Application) => {
  app.use(loggerMiddleware);
  app.use(GRAPHQL_PATH, jwtDecode);
  app.use(authenticationErrorInterceptor);
};

export default middleware;

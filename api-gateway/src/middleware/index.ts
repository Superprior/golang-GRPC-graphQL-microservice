import Express from 'express';
import { logging } from './logger';
import authentication from './authentication';

const middleware = (app: Express.Application) => {
  app.use(logging);
  app.use('GRAPHQL_PATH', authentication);
};

export default middleware;

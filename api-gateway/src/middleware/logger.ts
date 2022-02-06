import pino from 'pino';
import expressPinoLogger from 'express-pino-logger';

const levels = {
  http: 10,
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  fatal: 60
};

export const logger = pino({
  customLevels: levels,
  useOnlyCustomLevels: true,
  level: 'http',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true
    }
  }
});

const loggerMiddleware = expressPinoLogger({
  autoLogging: false,
  logger
});

export default loggerMiddleware;

import pino from 'pino-http';

export const logging = pino({
  useLevel: 'info'
});

// eslint-disable-next-line prefer-destructuring
export const logger = logging.logger;

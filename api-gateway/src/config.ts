type IConfig = {
  GRAPHQL_PATH: string;
  SALT: number;
  SECRET_KEY: string;
  JWT_ALGORITHM: string;
  JWT_EXPIRATION: string;
  IS_DEVELOPMENT: boolean;
  PORT: number;
  POST_SERVICE_URL: string;
  COMMENT_SERVICE_URL: string;
};

class EnvReader {
  private buildConfig() {
    const config = {
      GRAPHQL_PATH: process.env.GRAPHQL_PATH,
      SALT: process.env.SALT ? parseInt(process.env.SALT, 10) : null,
      SECRET_KEY: process.env.SECRET_KEY,
      JWT_ALGORITHM: process.env.JWT_ALGORITHM,
      JWT_EXPIRATION: process.env.JWT_EXPIRATION,
      IS_DEVELOPMENT: Boolean(process.env.IS_DEVELOPMENT),
      PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : null,
      POST_SERVICE_URL: process.env.POST_SERVICE_URL,
      COMMENT_SERVICE_URL: process.env.COMMENT_SERVICE_URL
    };

    Object.keys(config).forEach((key) => {
      if (!config[key]) throw new Error(`ENV KEY - ${key} - is not set`);
    });

    return config as IConfig;
  }

  getConfig(): IConfig {
    return this.buildConfig();
  }
}

const configuration = new EnvReader().getConfig();
export const { GRAPHQL_PATH } = configuration;
export const { SALT } = configuration;
export const { SECRET_KEY } = configuration;
export const { JWT_ALGORITHM } = configuration;
export const { JWT_EXPIRATION } = configuration;
export const { IS_DEVELOPMENT } = configuration;
export const { PORT } = configuration;
export const { POST_SERVICE_URL } = configuration;
export const { COMMENT_SERVICE_URL } = configuration;

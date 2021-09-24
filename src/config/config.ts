import * as dotenv from 'dotenv';
dotenv.config();

const node_env: string = process.env.NODE_ENV;

class ConfigSingleton {
  private static instance: ConfigSingleton;

  readonly development = {
    jwtKey: process.env.JWT_KEY,
    connectionString: process.env.CONNECTION_STRING,
  };

  public static getInstance(): ConfigSingleton {
    if (!ConfigSingleton.instance)
      ConfigSingleton.instance = new ConfigSingleton();

    return ConfigSingleton.instance;
  }
}

export default ConfigSingleton.getInstance()[node_env];

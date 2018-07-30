import development from './dev';
import production from './prod';

interface IConfig {
  production: boolean;
  port: number;
  redisURI: string;
  mongoURI: string;
  allowedOrigins: string[];
}

let config: IConfig;

if (process.env.NODE_ENV === 'production') {
  config = production;
} else {
  config = development;
}

export default config;

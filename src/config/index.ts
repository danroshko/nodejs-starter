import development from './dev';
import production from './prod';

interface IConfig {
  port: number;
  redisURI: string;
  mongoURI: string;
}

let config: IConfig;

if (process.env.NODE_ENV === 'production') {
  config = production;
} else {
  config = development;
}

export default config;

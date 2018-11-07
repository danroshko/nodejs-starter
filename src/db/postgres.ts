import { Pool, PoolConfig } from 'pg';

const config: PoolConfig = {
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT as string, 10),
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
};

const pool = new Pool(config);

export const query = (text: string, params?: any[]) => pool.query(text, params);

export const getClient = () => pool.connect();

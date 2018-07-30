import { Middleware } from 'koa';
import config from './config';

const { allowedOrigins } = config;

export const cors: Middleware = async (ctx, next) => {
  const origin = ctx.get('Origin');
  const headers = ctx.get('Access-Control-Request-Headers');

  if (!origin) {
    return next();
  }

  ctx.assert(allowedOrigins.indexOf(origin) !== -1, 403, 'Origin is not allowed');

  ctx.set({
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET,HEAD,POST,PATCH,PUT,DELETE',
    'Access-Control-Allow-Headers': headers,
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Max-Age': '600'
  });

  return next();
};

export const logger: Middleware = async (ctx, next) => {
  const start = Date.now();
  await next();
  const rtime = Date.now() - start;

  const { url, method, status } = ctx;
  console.log(`[${status}] ${method} ${url} - ${rtime}ms`);
};

export const errorHandler: Middleware = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    ctx.status = error.status || 500;
    ctx.body = ctx.status === 500 ? 'Internal error' : error.message;

    if (!error.expose) {
      console.error(error);
    }
  }
};

import { Middleware } from 'koa';

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

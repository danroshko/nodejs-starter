import { Middleware } from 'koa';

export const logger: Middleware = async (ctx, next) => {
  const start = Date.now();
  await next();
  const rtime = Date.now() - start;

  const { url, method, status } = ctx;
  console.log(`[${status}] ${method} ${url} - ${rtime}ms`);
};

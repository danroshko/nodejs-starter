import Router from 'koa-router';
import redis from '../db/redis';

const router = new Router({ prefix: '/health' });

router.get('/app', async ctx => {
  ctx.body = { result: 'App works' };
});

router.get('/redis', async ctx => {
  await redis.get('test:health');
  ctx.body = { result: 'Redis works' };
});

export default router;

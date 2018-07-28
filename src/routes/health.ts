import Router from 'koa-router';
import redis from '../db/redis';
import { test } from '../db/mongo';

const router = new Router({ prefix: '/health' });

router.get('/app', async ctx => {
  ctx.body = { result: 'App works' };
});

router.get('/redis', async ctx => {
  await redis.get('test:health');
  ctx.body = { result: 'Redis works' };
});

router.get('/mongo', async ctx => {
  await test.find({});
  ctx.body = { result: 'MongoDB works' };
});

router.post('/body', async ctx => {
  ctx.assert(typeof ctx.request.body.n === 'number', 400, 'Expecting number');

  ctx.status = 201;
  ctx.body = { result: 'Body parser works' };
});

export default router;

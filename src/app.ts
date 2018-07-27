import Koa from 'koa';
import parser from 'koa-body';
import config from './config';
import routes from './routes';

const app = new Koa();

app.use(parser({ urlencoded: false }));

for (const route of routes) {
  app.use(route.routes()).use(route.allowedMethods());
}

app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}`);
});

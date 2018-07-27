import Koa from 'koa';
import parser from 'koa-body';
import config from './config';
import routes from './routes';
import { connect } from './db/mongo';

const app = new Koa();

app.use(parser({ urlencoded: false }));

for (const route of routes) {
  app.use(route.routes()).use(route.allowedMethods());
}

const onConnect = () => {
  console.log(`Listening on port ${config.port}`);
};

connect.then(() => {
  app.listen(config.port, onConnect);
});

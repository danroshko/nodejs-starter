FROM node:10.7 as base

COPY . /code
WORKDIR /code
RUN npm install -q && npm install -g pm2

FROM base as dev
ENV NODE_ENV=development
RUN pm2 install typescript
CMD [ "pm2-runtime", "start", "--watch", "src/app.ts" ]

FROM base as prod
ENV NODE_ENV=production
RUN npm run build
CMD [ "pm2-runtime", "start", "dist/app.js" ]
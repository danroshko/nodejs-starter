FROM node:10.13.0 as base

COPY . /code
WORKDIR /code
RUN npm install -q

FROM base as dev
ENV NODE_ENV=development
RUN npm i -g nodemon
CMD [ "npm", "run", "watch" ]

FROM base as prod
ENV NODE_ENV=production
RUN npm install -g pm2 && npm run build
CMD [ "pm2-runtime", "start", "dist/app.js" ]
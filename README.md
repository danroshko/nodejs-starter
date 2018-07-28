# Node.js API starter

A starter template for Node.js projects. Similar to [TypeScript Node Starter](https://github.com/Microsoft/TypeScript-Node-Starter) and [Node.js API Starter Kit](https://github.com/kriasoft/nodejs-api-starter), but more minimal and with slightly different technology stack:

- **Typescript**
- **koa** (with koa-router and koa-body)
- **MongoDB** and **Redis**
- Testing with **Jest**

## Prerequisites

- Docker (17.05 or higher) and docker-compose
- Node.js (8.11 or higher)

## Getting Started

```bash
git clone https://github.com/danroshko/nodejs-starter
cd nodejs-starter
npm install
npm start
```

Commands:

- `npm start` - start MongoDB, Redis and development server on port 3000,
- `npm test` - run tests
- `npm run stop` - stop and remove all services
- `npm run build` - compile all typescript files

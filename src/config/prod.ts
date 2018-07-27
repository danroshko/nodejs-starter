export default {
  port: +(process.env.PORT || 3000),
  redisURI: process.env.REDIS_URI as string,
  mongoURI: process.env.MONGO_URI as string
};

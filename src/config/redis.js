const IORedis = require("ioredis");

const createRedisConnection = () => {
  if (!process.env.REDIS_URL) {
    throw new Error(
      "REDIS_URL is not configured. Add your Upstash Redis URL to .env",
    );
  }

  return new IORedis(process.env.REDIS_URL, {
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
  });
};

module.exports = createRedisConnection;

const { Queue } = require("bullmq");
const createRedisConnection = require("../config/redis");

const connection = createRedisConnection();

const emailQueue = new Queue("product-notification", { connection });

module.exports = emailQueue;

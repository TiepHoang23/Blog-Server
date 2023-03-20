const redis = require('redis');

const redisClient = redis.createClient({
  password: '5MxU1xRHrTfN8sP0E2JC0ezci3yO8k2U',
  socket: {
    host: 'redis-13980.c295.ap-southeast-1-1.ec2.cloud.redislabs.com',
    port: 13980,
  },
});
redisClient.connect();
redisClient.on('ready', () => {
  logger.info('connected to redis');
});

redisClient.on('error', error => {
  logger.info('redis error', error);
  process.exit(1);
});

module.exports = redisClient;

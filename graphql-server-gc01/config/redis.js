const Redis = require("ioredis");
const redis = new Redis({
  port: 10188, // Redis port
  host: "redis-10188.c252.ap-southeast-1-1.ec2.cloud.redislabs.com", // Redis host
  username: "default", // needs Redis >= 6
  password: process.env.PASSWORD_REDIS,
  db: 0, // Defaults to 0
});

module.exports = redis;

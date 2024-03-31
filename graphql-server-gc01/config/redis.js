const Redis = require("ioredis");
const redis = new Redis({
  port: 10188, // Redis port
  host: process.env.HOST_REDIS, // Redis host
  username: "default", // needs Redis >= 6
  password: process.env.PASSWORD_REDIS,
  db: 0, // Defaults to 0
});

module.exports = redis;

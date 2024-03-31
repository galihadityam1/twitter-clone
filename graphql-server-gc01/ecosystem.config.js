module.exports = {
  apps: [
    {
      name: "namaApp",
      script: "./index.js",
      env: {
        PORT: 80,
        MONGO_URI:
          "mongodb+srv://galihadityam1:GC1-Cluster@gc1-cluster.rsahnup.mongodb.net/?retryWrites=true&w=majority&appName=GC1-Cluster",
        JWT_SECRET: "secret",
        PASSWORD_REDIS: "UcrYLpapGU6qG0E1e9SHaeRANi2hstRQ",
        HOST_REDIS: "redis-10188.c252.ap-southeast-1-1.ec2.cloud.redislabs.com",
      },
    },
  ],
};

const redis = require("redis");
const client = redis.createClient({
  host: "redis-13562.c82.us-east-1-2.ec2.cloud.redislabs.com",
  port: 13562,
  password: "1aqldeP6LgQWUaNjSqSV6JxDi5Jbgpr5",
});

client.on("error", function (error) {
  console.error(error);
});

client.on("connect", function () {
  console.log("In conncect");
  console.log(client.server_info);
});

client.on("ready", function () {
  console.log("ready");
  console.log(client.server_info);
});

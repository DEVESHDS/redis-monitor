const express = require("express");
const md5 = require("md5");
const app = express();
const redis = require("redis");
const md5lib = require("md5");
const { init, sequelize } = require("./database/db");
const RedisInfo = require("./database/model");

app.use(express.urlencoded());
app.use(express.json());

app.use(express.static(__dirname + "/public"));
app.set("views", __dirname + "/public/views");
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

// function ping(host, port, password) {
//   let result = {};
//   const client = redis.createClient({
//     host: host,
//     port: port,
//     pssword: password,
//   });
//   client.on("ready", () => {
//     result.success = 1;
//     result.data = "Ping success!";
//   });
//   client.on('error',()=>{
//     result.success=0;
//     result.data="ping error!";
//   });
// }

async function test() {
  try {
    await init();

    // const redis_client = await RedisInfo.create({
    //   md5: "789456",
    //   host: "slaveserver",
    //   port: 35,
    //   password: "qwerty",
    // });

    // console.log(redis_client);

    const redis_infos = await RedisInfo.findAll();
    console.log("All Redis_Infos:", JSON.stringify(redis_infos, null, 2));
  } catch (err) {
    console.log("An error has Occured", err);
  }
}

test();

app.get("/", (req, res) => {
  res.render("index_page.html");
});

//Route for redis list api

app.get("/api/redis_list", async (req, res) => {
  let result = {};
  result["success"] = 1;
  try {
    const data = await RedisInfo.findAll();
    let temp = [];
    for (let i = 0; i < data.length; i++) {
      console.log(data[i].dataValues);
      temp.push(data[i].dataValues);
    }
    result.data = temp;
    console.log("Printing temp", JSON.stringify(result));

    res.send(JSON.stringify(result));
  } catch (error) {
    console.log("Error in the data base");
  }
});

//redis_info route
app.get("/api/redis_info", async (req, res) => {
  let id = req.query.md5;
  try {
    const ele = await RedisInfo.findAll({ where: { md5: id } });
    if (ele) {
      let result = {};
      result["success"] = 1;
      //   let temp = [];
      //   temp.push(ele[0].dataValues);
      result.data = ele[0].dataValues;
      res.send(JSON.stringify(result));
    } else {
      let result = {};
      result["success"] = 0;
      result.data = [];
      res.send(JSON.stringify(result));
    }
  } catch (error) {
    res.send(error);
  }
});

//route for redis monitor
app.get("/api/redis_monitor", async (req, res) => {
  let md5 = req.query.md5;
  try {
    const ele = await RedisInfo.findAll({ where: { md5: md5 } });
    if (ele) {
      const startTime = Date.now();
      const client = redis.createClient({
        host: "redis-13562.c82.us-east-1-2.ec2.cloud.redislabs.com",
        port: 13562,
        password: "1aqldeP6LgQWUaNjSqSV6JxDi5Jbgpr5",
      });
      client.on("ready", function () {
        console.log("ready");
        let result = {};
        result["success"] = 1;
        delete client.server_info.versions;
        client.server_info.get_time = Date.now() - startTime;
        result.data = client.server_info;
        res.send(JSON.stringify(result));
        client.quit();
      });
      client.on("error", function (error) {
        console.error(error);
      });
    } else {
      let result = {};
      result["success"] = 0;
      result.data = [];
      res.send(JSON.stringify(result));
    }
  } catch (error) {
    res.send(error);
  }
});

//Route for Ping
app.get("/api/ping", async (req, res) => {
  let host = req.query.host;
  let port = req.query.port;
  let password = req.query.password;
  let result = {};
  console.log("API Called");
  const client = redis.createClient({
    host: host,
    port: port,
    password: password,
  });
  client.on("ready", () => {
    console.log("Ping has been successfull");
    result.success = 1;
    result.data = "Ping success!";
    client.quit();
    res.send(JSON.stringify(result));
  });
  client.once("error", () => {
    console.log("sorry,Cannot connect to server");
    result.success = 0;
    result.data = "ping error!";
    res.send(JSON.stringify(result));
  });
  client.on("error", () => {
    console.log("Second event has benn handled");
  });
});

//route for add api

app.post("/api/add", (req, res) => {
  let host = req.body.host;
  let port = req.body.port;
  let password = req.body.password;
  let result = {};
  const client = redis.createClient({
    host: host,
    port: port,
    password: password,
  });
  client.on("ready", async () => {
    const redis_client = await RedisInfo.create({
      md5: md5lib(host + port),
      host: host,
      port: port,
      password: password,
    });
    console.log("redis client is added ", redis_client);
    result.success = 1;
    result.data = redis_client;
    res.send(JSON.stringify(result));
    client.quit();
  });
  client.once("error", () => {
    result.success = 0;
    result.data = "Ping error!";
    res.send(JSON.stringify(result));
    client.quit();
  });
  client.on("error", () => {
    console.log("Other events are listened");
    client.quit();
  });
});

app.listen(1234, () => {
  console.log("App is listening");
});

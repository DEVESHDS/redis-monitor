const express = require("express");
const app = express();
const { init } = require("./database/db");
const RedisInfo = require("./database/model");

app.use(express.static("public"));

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

app.get("/api/redis_list", (req, res) => {
  let result = {};
  result["sucess"] = 1;
  try {
    const getdata = async () => {
      const data = await RedisInfo.findAll();
      let temp = [];
      for (let i = 0; i < data.length; i++) {
        console.log(data[i].dataValues);
        temp.push(data[i].dataValues);
      }
      result.data = temp;
      console.log("Printing temp", JSON.stringify(result));
      res.send(JSON.stringify(result));
    };
    getdata();
  } catch (error) {
    console.log("Error in the data base");
  }
});

app.listen(1234, () => {
  console.log("App is listening");
});

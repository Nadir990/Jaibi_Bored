// import node modules
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const request = require("request");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

/* inzializate express */
const app = express();
app.use(express.json()); /* deseriliazzo tutti json con express*/
app.use(
  express.urlencoded({
    extended: false,
  })
); /* deseriliazzo tutti json url encoed con express*/
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);
app.use(cors());
app.use(helmet());
app.use(morgan("tiny", { stream: accessLogStream }));
app.use(express.static("public"));

let url = `http://www.boredapi.com/api/activity/`; /*URL API*/

/* GET request for random activity  && send it back to client*/
app.get("/ser", (req, res) => {
  request(url, (error, response, body) => {
    jsonActivity = JSON.parse(body);
    // console.log(jsonActivity);
    res.send(jsonActivity);
    res.status(200);
  });
});

app.get("/", (req, res) => {
res.sendFile(path.resolve('public/index.html'));
});

/* POST request from client*/
app.post("/req", (req, res) => {
  // console.log(Object.values(req.body));
  cl = Object.values(req.body).toString();
  arr = cl.split(",");
  request(
    `http://www.boredapi.com/api/activity?type=${arr[0].toString()}&participants=${arr[1].toString()}`,
    (error, response, body) => {
      json = JSON.parse(body);
      res.send(json);
      res.status(200);
    }
  );
});

//manage error URL
app.use("*", function (req, res, next) {
  res.status(404);
  res.send("Url non presente");
});

/*ascolto porta*/
app.listen(3000);

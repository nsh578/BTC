//Main File
//app setup

//calling packages
require("dotenv").config();
var express = require("express");
var app = express();
var bodyParser = require("body-parser");

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

// TODO: Change to different DB
// const MongoClient = require("mongodb").MongoClient;
// const uri =
//   "mongodb+srv://nsh578:" +
//   process.env.MONGO_DB_PW +
//   "@cluster0.rjs98.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// client.connect((err) => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

// var mongoose = require("mongoose");
// mongoose.connect("mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o");

var mongoose = require("mongoose");
var uri =
  "mongodb+srv://nsh578:" +
  process.env.MONGO_DB_PW +
  "@cluster0.rjs98.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

var Coin = require("./app/models/coin");

//ROUTES For API
var router = express.Router();

// middleware to use for all requests
// we can do validations, errors, logging, etc. here
router.use(function (req, res, next) {
  // do logging
  console.log("Something is happening.");
  next(); // make sure we go to the next routes and don't stop here
});

//test route
router.get("/", function (req, res) {
  res.json({ message: "welcome to my coin app" });
});

//Routes ending in /coins
router.route("/coins").post(function (req, res) {
  var coin = new Coin();
  coin.name = req.body.name;

  //save coin and checking for errors
  coin.save(function (err) {
    if (err) res.send(err);
    res.json({ message: "Coin " + coin.name + " is created!" });
  });
});

//Registering Routes
//All apis will be prefixed by /api
app.use("/api", router);

//Starting the server
app.listen(port);
console.log("Bitcoin on port " + port);

// Command to start node app:
// $ node server.js

//Main File
//app setup

//calling packages
var express = require("express");
var app = express();
var bodyParser = require("body-parser");

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

//ROUTES For API
var router = express.Router();

//test route
router.get("/", function (req, res) {
  res.json({ message: "welcome to my coin app" });
});

//Registering Routes
//All apis will be prefixed by /api
app.use("/api", router);

//Starting the server
app.listen(port);
console.log("Bitcoin on port " + port);

// Command to start node app:
// $ node server.js

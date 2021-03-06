var express = require("express");
var bodyParser = require("body-parser");
//////
var method = require("method-override");
////
var port = 3000;
var app = express();

app.use(express.static("public"));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


var routes = require("./controllers/burger_controller.js");

app.use("/", routes);

app.listen(port);

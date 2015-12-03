var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var path = require("path");
mongoose.connect("mongodb://localhost/database");

var app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname + "/public")));
app.set("views", __dirname + "/public/views");
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");

app.get("/", function(req,res) {
  res.render("index.html");
});

app.get("/data", function(req,res) {
  res.sendfile("public/views/data.json");
});

app.listen(8080);

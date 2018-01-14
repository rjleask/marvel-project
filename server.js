const express = require("express");
var app = express();
const bodyParser = require("body-parser");
const path = require("path");
// const db = require("./models");
const mysql = require("mysql");
const inquirer = require("inquirer");
const routes = require("./routes");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("client/build"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);

var PORT = process.env.PORT || 3001;
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

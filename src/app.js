const express = require("express");
const bodyParser = require("body-parser");
require("./auth/passport");

const routes = require("./routes/index");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", routes);

module.exports = app;

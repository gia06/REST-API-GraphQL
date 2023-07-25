const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("./auth/passport");

const routes = require("./routes/index");

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", routes);

module.exports = app;

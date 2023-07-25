const express = require("express");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const path = require("path");

const router = express.Router();

const indexDoc = YAML.load(path.join(__dirname, "../swagger/index.yaml"));
const authDoc = YAML.load(path.join(__dirname, "../swagger/paths/auth.yaml"));
const tasksDoc = YAML.load(path.join(__dirname, "../swagger/paths/tasks.yaml"));

indexDoc.paths = { ...authDoc, ...tasksDoc };

module.exports = () => {
  router.use("/", swaggerUi.serve, swaggerUi.setup(indexDoc));

  return router;
};

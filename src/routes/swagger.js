import express from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const router = express.Router();

const indexDoc = YAML.load("./src/swagger/index.yaml");
const authDoc = YAML.load("./src/swagger/paths/auth.yaml");
const tasksDoc = YAML.load("./src/swagger/paths/tasks.yaml");

indexDoc.paths = { ...authDoc, ...tasksDoc };

export default () => {
  router.use("/", swaggerUi.serve, swaggerUi.setup(indexDoc));

  return router;
};

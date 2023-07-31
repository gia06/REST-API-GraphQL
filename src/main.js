import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import makeStoppable from "stoppable";
import http from "http";

import "./auth/passport.js";
import routes from "./routes/index.js";
import { logger } from "./logger/logger.js";

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", routes);

const server = makeStoppable(http.createServer(app));

export default () => {
  const port = process.env.PORT || 3000;

  const stopServer = () => {
    return new Promise((resolve) => {
      server.stop(resolve);
    });
  };

  return new Promise((resolve) => {
    server.listen(port, () => {
      logger.info("Express server is listening on http://localhost:3000");
      resolve(stopServer);
    });
  });
};

import { connectToMongoose } from "./src/db/connection.js";
import startServer from "./src/main.js";
import { logger } from "./src/logger/logger.js";

connectToMongoose()
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((err) => {
    logger.error(err);
  });

startServer();

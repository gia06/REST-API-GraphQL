import Sequelize from "sequelize";
import { logger } from "../logger/logger.js";

const { DB_USERNAME, DB_HOST, DB_PWD, DB_NAME } = process.env;

export const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PWD, {
  host: DB_HOST,
  dialect: "mysql",
});

export const connectToMySQL = async (sequelize) => {
  try {
    await sequelize.authenticate();
    logger.info("Connection has been established successfully.");
  } catch (error) {
    logger.error(error, "Unable to connect to the database:");
  }
};

import { pino } from "pino";
import dotenv from "dotenv";

dotenv.config();

const pretty = {
  transport: {
    target: "pino-pretty",
    options: {
      translateTime: "SYS:dd-mm-yyyy HH:MM:ss",
      ignore: "pid,hostname",
    },
  },
};

export const logger =
  process.env.NODE_ENV === "production" ? pino(pretty) : console;

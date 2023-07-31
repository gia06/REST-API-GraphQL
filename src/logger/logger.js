import { pino } from "pino";

const pretty =
  process.env.NODE_ENV === "production"
    ? {
        transport: {
          target: "pino-pretty",
          options: {
            translateTime: "SYS:dd-mm-yyyy HH:MM:ss",
            ignore: "pid,hostname",
          },
        },
      }
    : {};

export const logger = pino(pretty);

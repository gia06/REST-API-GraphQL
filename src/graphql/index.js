import express from "express";
import { graphqlHTTP } from "express-graphql";
import { decodeJwt } from "../auth/jwt.js";
import usersService from "../service/UsersService.js";
import { schemaWithMiddleware } from "./middlewares/index.js";
import { logger } from "../logger/logger.js";

const router = express.Router();

const authorizeUser = async (req, res, next) => {
  try {
    const token = await decodeJwt(req.headers.authorization);
    const user = await usersService.findById(token.id);

    if (user) return next();

    logger.error("User Unautorized");
    return res.sendStatus(401);
  } catch (err) {
    logger.error("User Unautorized");
    res.sendStatus(401);
  }
};

router.use(
  "/",
  authorizeUser,
  graphqlHTTP(async (req, res) => {
    const { authorization } = req.headers;
    const userId = await (await decodeJwt(authorization)).id;

    return {
      schema: schemaWithMiddleware,
      graphiql: true,
      context: { userId },
    };
  })
);

export default router;

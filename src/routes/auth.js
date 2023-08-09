import express from "express";
import {
  validateRegistration,
  validateLogin,
  registerValidationResult,
  loginValidationResult,
} from "../validation/validateUser.js";
import { signJwt } from "../auth/jwt.js";
import { logger } from "../logger/logger.js";
const router = express.Router();

export default (params) => {
  const { usersService } = params;

  router.post(
    "/register",
    validateRegistration,
    registerValidationResult,
    async (req, res, next) => {
      try {
        const { name, surname, email, password } = req.body;

        await usersService.create({ name, surname, email, password });

        return res.status(200).send("");
      } catch (err) {
        logger.error(err);
        return res
          .status(505)
          .json({ message: "Something went wrong on the server!" });
      }
    }
  );

  router.post(
    "/login",
    validateLogin,
    loginValidationResult,
    async (req, res, next) => {
      try {
        const { email, password } = req.body;

        const { user } = req.res.locals;

        const result = await user.comparePassword(password);

        if (!result) {
          logger.error("Incorrect email or password");
          return res
            .status(400)
            .json({ message: "Incorrect email or password" });
        }

        const token = await signJwt({ id: user.id });

        return res.status(200).json({ user: { email }, token });
      } catch (err) {
        logger.error("error is:", err);
        return res
          .status(505)
          .json({ message: "Something went wrong on the server" });
      }
    }
  );

  return router;
};

const express = require("express");
const {
  validateRegistration,
  validateLogin,
  registerValidationResult,
  loginValidationResult,
} = require("../validation/validateUser");
const { signJwt } = require("../auth/jwt");
const comparePassword = require("../auth/comparePassword");

const router = express.Router();

module.exports = (params) => {
  const { usersService, User } = params;

  router.post(
    "/register",
    validateRegistration,
    registerValidationResult,
    async (req, res, next) => {
      try {
        const { name, surname, email, password } = req.body;

        const user = await new User(name, surname, email, password);

        await usersService.save(user);

        return res
          .status(200)
          .json({ message: "A user was successfully registered." });
      } catch (err) {
        next(err);
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

        const result = await comparePassword(password, user.password);

        if (!result)
          return res
            .status(400)
            .json({ message: "Incorrect email or password" });

        const token = await signJwt({ id: user.id });

        return res.status(200).json({ user: { email }, token });
      } catch (err) {
        next(err);
        return res
          .status(505)
          .json({ message: "Something went wrong on the server" });
      }
    }
  );

  return router;
};

import { check, validationResult } from "express-validator";
import usersService from "../service/UsersService.js";
import { logger } from "../logger/logger.js";

// * Custom validators
const registrationValidator = async (email) => {
  const user = await usersService.findByEmail(email);

  if (user) {
    logger.error("User with provided email already exists");
    throw new Error(`User with provided email already exists`);
  }
};

const loginValidator = async (email, server) => {
  const user = await usersService.findByEmail(email);

  if (!user) {
    logger.error("Incorrect email or password");
    throw new Error("Incorrect email or password");
  }

  server.req.res.locals = { user };
};

// * Validation chains
export const validateRegistration = [
  check("email")
    .trim()
    .isLength({ min: 6 })
    .withMessage("emails length should be at least 6 letters!"),
  check("email")
    .isEmail()
    .withMessage("property email must be a valid email address!"),
  check("email").trim().custom(registrationValidator),
  check("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("password length should be at least 8 letters!"),
  check("name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("property name is required!"),
  check("surname")
    .trim()
    .isLength({ min: 1 })
    .withMessage("property surname is required!"),
];

export const validateLogin = [
  check("email").trim().isLength({ min: 1 }).withMessage("email is required!"),
  check("password").trim().isLength({ min: 1 }),
  check("email").custom(loginValidator),
];

//  * Validation results
export const registerValidationResult = (req, res, next) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    return next();
  }

  logger.error(result.array());
  return res.status(400).json({ errors: result.array() });
};

export const loginValidationResult = (req, res, next) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    return next();
  }

  logger.error("Incorrect email or password");
  return res.status(400).json({ message: "Incorrect email or password" });
};

const { check, validationResult } = require("express-validator");
const UsersService = require("../service/UsersService");

const usersService = new UsersService("./src/db/users.json");

// * Custom validators
const registrationValidator = async (email) => {
  const user = await usersService.findByEmail(email);

  if (user) {
    throw new Error(`User with provided email already exists`);
  }
};

const loginValidator = async (email, server) => {
  const user = await usersService.findByEmail(email);

  if (!user) throw new Error("Incorrect email or password");

  server.req.res.locals = { user };
};

// * Validation chains
const validateRegistration = [
  check("email")
    .trim()
    .isLength({ min: 8 })
    .withMessage("emails length should be at least 8 letters!"),
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

const validateLogin = [
  check("email").trim().isLength({ min: 1 }).withMessage("email is required!"),
  check("password").trim().isLength({ min: 1 }),
  check("email").custom(loginValidator),
];

//  * Validation results
const registerValidationResult = (req, res, next) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    return next();
  }

  return res.status(400).json({ errors: result.array() });
};

const loginValidationResult = (req, res, next) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    return next();
  }

  return res.status(400).json({ message: "Incorrect email or password" });
};

module.exports = {
  validateRegistration,
  validateLogin,
  registerValidationResult,
  loginValidationResult,
};

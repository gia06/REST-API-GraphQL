const { check, validationResult } = require("express-validator");
const { decodeJwt } = require("../auth/jwt");

const TasksService = require("../service/TasksService");

const tasksService = new TasksService("./src/db/tasks.json");

//  * Custom validators
const taskAddValidator = async (title, server) => {
  const { authorization } = server.req.headers;
  const { id } = await decodeJwt(authorization);
  const task = await tasksService.findByTitle(title, id);
  if (task) throw new Error(`Tasks with provided title already exists`);
};

const taskUpdateValidator = async (title, server) => {
  const { authorization } = server.req.headers;
  const { id } = await decodeJwt(authorization);
  const task = await tasksService.findByTitle(title, id);

  if (!task) throw new Error(`Task with provided title doesn\'t exist`);
  server.req.res.locals = { task };
};

// * Validation chains
const validateTaskAdd = [
  check("title")
    .trim()
    .isLength({ min: 4 })
    .withMessage("title length should be at least 4 letters!"),
  check("title").custom(taskAddValidator),
  check("description")
    .trim()
    .isLength({ min: 6 })
    .withMessage("description length should be at least 6 letters!"),
];

const validateTaskDone = [
  check("title").trim().isLength({ min: 1 }).withMessage("title is required!"),
  check("title").custom(taskUpdateValidator),
];

const validateTaskUpdate = [
  check("taskTitle").custom(taskUpdateValidator),
  check("title").trim().isLength({ min: 1 }).withMessage("title is required!"),
  check("title").custom(taskAddValidator),
  check("description")
    .trim()
    .isLength({ min: 1 })
    .withMessage("description is required!"),
];

const validateTaskDelete = [
  check("title").trim().isLength({ min: 1 }).withMessage("title is required!"),
  check("title").custom(taskUpdateValidator),
];

// * Validation chain
const validResult = (req, res, next) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    return next();
  }

  if (result.array()[0].msg === `Task with provided title doesn\'t exist`)
    return res.status(404).json({ message: result.array()[0].msg });

  return res.status(400).json({ errors: result.array() });
};

module.exports = {
  validateTaskAdd,
  validateTaskDone,
  validateTaskUpdate,
  validateTaskDelete,
  validResult,
};

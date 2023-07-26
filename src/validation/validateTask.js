import { check, validationResult } from "express-validator";
import { decodeJwt } from "../auth/jwt.js";

import tasksService from "../service/TasksService.js";

//  * Custom validators
const taskAddValidator = async (title, server) => {
  const { authorization } = server.req.headers;
  const { id } = await decodeJwt(authorization);
  const task = await tasksService.findByTitle(title, id);
  if (task) throw new Error(`Tasks with provided title already exists`);
};

const taskDoneValidator = async (title, server) => {
  const { authorization } = server.req.headers;
  const { id } = await decodeJwt(authorization);
  const task = await tasksService.findByTitle(title, id);

  if (!task) throw new Error(`Task with provided title doesn\'t exist!`);
  else if (task.isDone) throw new Error(`Task is already marked as done!`);

  server.req.res.locals = { task };
};

const taskUpdateValidator = async (title, server) => {
  const { authorization } = server.req.headers;
  const { id } = await decodeJwt(authorization);
  const task = await tasksService.findByTitle(title, id);

  if (!task) throw new Error(`Task with provided title doesn\'t exist!`);
  server.req.res.locals = { task };
};

const taskDeleteValidator = async (title, server) => {
  const { authorization } = server.req.headers;
  const { id } = await decodeJwt(authorization);
  const task = await tasksService.findByTitle(title, id);

  if (!task) throw new Error(`Task is already deleted!`);
  server.req.res.locals = { task };
};

// * Validation chains
export const validateTaskAdd = [
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

export const validateTaskDone = [
  check("title").trim().isLength({ min: 1 }).withMessage("title is required!"),
  check("title").custom(taskDoneValidator),
];

export const validateTaskUpdate = [
  check("taskTitle").custom(taskUpdateValidator),
  check("title").trim().isLength({ min: 1 }).withMessage("title is required!"),
  check("title").custom(taskAddValidator),
  check("description")
    .trim()
    .isLength({ min: 1 })
    .withMessage("description is required!"),
];

export const validateTaskDelete = [
  check("title").trim().isLength({ min: 1 }).withMessage("title is required!"),
  check("title").custom(taskDeleteValidator),
];

// * Validation chain
export const validResult = (req, res, next) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    return next();
  }

  if (result.array()[0].msg === `Task with provided title doesn\'t exist!`)
    return res.status(404).json({ message: result.array()[0].msg });

  if (result.array()[0].msg === `Task is already deleted!`) {
    return res.sendStatus(204);
  }

  return res.status(400).json({ errors: result.array() });
};

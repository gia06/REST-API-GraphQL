import { schema } from "../schema.js";
import { applyMiddleware } from "graphql-middleware";
import tasksService from "../../service/TasksService.js";
import { logger } from "../../logger/logger.js";

async function createTaskMiddleware(
  resolve,
  parent,
  { task: { title } },
  { userId }
) {
  const storedTask = await tasksService.findByTitle(title, userId);
  if (storedTask) {
    logger.error("Task with provided title already exists");
    throw new Error("Task with provided title already exists");
  }

  return resolve();
}

const updateTaskMiddleware = async (
  resolve,
  parent,
  { id, task },
  { userId }
) => {
  const storedTask = await tasksService.findById(id, userId);

  if (!storedTask) {
    logger.error("Task with provided id doesn't exists");
    return new Error("Task with provided id doesn't exists");
  }
  return resolve();
};

const deleteTaskMiddleware = updateTaskMiddleware;

const middlewares = {
  Mutation: {
    createTask: createTaskMiddleware,
    updateTask: updateTaskMiddleware,
    deleteTask: deleteTaskMiddleware,
  },
};

export const schemaWithMiddleware = applyMiddleware(schema, middlewares);

import express from "express";
import { decodeJwt } from "../auth/jwt.js";
import {
  validateTaskAdd,
  validateTaskDone,
  validateTaskUpdate,
  validateTaskDelete,
  validResult,
} from "../validation/validateTask.js";

const router = express.Router();

export default (params) => {
  const { tasksService } = params;

  router.get("/", async (req, res, next) => {
    try {
      const { id } = await decodeJwt(req.headers.authorization);

      const tasks = await tasksService.findAll(id);

      res.status(200).json(tasks);
    } catch (err) {
      next(err);
      return res
        .status(505)
        .json({ message: "Something went wrong on the server" });
    }
  });

  router.get("/done", async (req, res, next) => {
    try {
      const { id } = await decodeJwt(req.headers.authorization);
      const tasks = await tasksService.findDone(id);

      res.status(200).json(tasks);
    } catch (err) {
      next(err);
      return res
        .status(505)
        .json({ message: "Something went wrong on the server" });
    }
  });

  router.post("/", validateTaskAdd, validResult, async (req, res, next) => {
    try {
      const { title, description } = req.body;
      const { id } = await decodeJwt(req.headers.authorization);

      await tasksService.save({ title, description, id });

      res.status(201).json({ message: "Task was successfully created!" });
    } catch (err) {
      next(err);
      return res
        .status(505)
        .json({ message: "Something went wrong on the server" });
    }
  });

  router.post(
    "/done",
    validateTaskDone,
    validResult,
    async (req, res, next) => {
      try {
        const { task } = req.res.locals;
        await tasksService.markDone(task.title, task.belongsTo);

        res
          .status(200)
          .json({ message: "task was successfully marked as done" });
      } catch (err) {
        next(err);
        return res
          .status(505)
          .json({ message: "Something went wrong on the server" });
      }
    }
  );

  router.put(
    "/:taskTitle",
    validateTaskUpdate,
    validResult,
    async (req, res, next) => {
      try {
        const { title, description } = req.body;

        const { task } = req.res.locals;

        await tasksService.update(
          task.title,
          title,
          description,
          task.belongsTo
        );

        res.status(200).json({ message: "A task was successfully updated." });
      } catch (err) {
        next(err);
        return res
          .status(505)
          .json({ message: "Something went wrong on the server" });
      }
    }
  );

  router.delete(
    "/",
    validateTaskDelete,
    validResult,
    async (req, res, next) => {
      try {
        const { task } = req.res.locals;

        await tasksService.delete(task.id, task.belongsTo);

        res.sendStatus(204);
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

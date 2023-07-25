const express = require("express");
const { decodeJwt } = require("../auth/jwt");
const {
  validateTaskAdd,
  validateTaskDone,
  validateTaskUpdate,
  validateTaskDelete,
  validResult,
} = require("../validation/validateTask");

const passport = require("passport");

const router = express.Router();

module.exports = (params) => {
  const { tasksService, Task } = params;

  router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
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
    }
  );

  router.get(
    "/done",
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
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
    }
  );

  router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    validateTaskAdd,
    validResult,
    async (req, res, next) => {
      try {
        const { title, description } = req.body;
        const { id } = await decodeJwt(req.headers.authorization);

        const task = new Task(title, description, id);

        await tasksService.save(task);

        res.status(201).json({ message: "Task was successfully created!" });
      } catch (err) {
        next(err);
        return res
          .status(505)
          .json({ message: "Something went wrong on the server" });
      }
    }
  );

  router.post(
    "/done",
    passport.authenticate("jwt", { session: false }),
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
    passport.authenticate("jwt", { session: false }),
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
    passport.authenticate("jwt", { session: false }),
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

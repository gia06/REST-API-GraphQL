const express = require("express");
const passport = require("passport");

const tasksRoutes = require("./tasks");
const authRoutes = require("./auth");
const swaggerRoute = require("./swagger");

const usersService = require("../service/UsersService");
const tasksService = require("../service/TasksService");

const User = require("../schema/User");
const Task = require("../schema/Task");

const router = express.Router();

router.use("/auth", authRoutes({ usersService, User }));
router.use(
  "/tasks",
  passport.authenticate("jwt", { session: false }),
  tasksRoutes({ tasksService, Task })
);
router.use("/", swaggerRoute());

module.exports = router;

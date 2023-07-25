const express = require("express");

const tasksRoutes = require("./tasks");
const authRoutes = require("./auth");
const swaggerRoute = require("./swagger");

const UserService = require("../service/UsersService");
const TasksService = require("../service/TasksService");

const User = require("../schema/User");
const Task = require("../schema/Task");

const usersService = new UserService("./src/db/users.json");
const tasksService = new TasksService("./src/db/tasks.json");

const router = express.Router();

router.use("/auth", authRoutes({ usersService, User }));
router.use("/tasks", tasksRoutes({ tasksService, Task }));
router.use("/", swaggerRoute());

module.exports = router;

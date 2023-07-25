const express = require("express");

const loginRoute = require("./tasks");
const registerRoute = require("./users");

const UserService = require("../service/UsersService");
const TasksService = require("../service/TasksService");

const User = require("../schema/User");
const Task = require("../schema/Task");

const usersService = new UserService("./src/db/users.json");
const tasksService = new TasksService("./src/db/tasks.json");

const router = express.Router();

router.use("/auth", registerRoute({ usersService, User }));
router.use("/tasks", loginRoute({ tasksService, Task }));

module.exports = router;

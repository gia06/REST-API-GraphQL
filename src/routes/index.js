import express from "express";
import passport from "passport";

import tasksRoutes from "./tasks.js";
import authRoutes from "./auth.js";
import swaggerRoute from "./swagger.js";

import usersService from "../service/UsersService.js";
import tasksService from "../service/TasksService.js";

const router = express.Router();

router.use("/auth", authRoutes({ usersService }));
router.use(
  "/tasks",
  passport.authenticate("jwt", { session: false }),
  tasksRoutes({ tasksService })
);
router.use("/", swaggerRoute());

export default router;

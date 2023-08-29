import mongoose from "mongoose";
import { DataTypes } from "sequelize";
import { sequelize } from "../db/connection.js";

export const Task = sequelize.define("Task", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  title: DataTypes.STRING,
  description: DataTypes.STRING,
  done: { type: DataTypes.BOOLEAN, defaultValue: false },
});

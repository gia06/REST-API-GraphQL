import mongoose from "mongoose";
import { DataTypes } from "sequelize";
import { sequelize } from "../db/connection.js";

const TaskSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    belongsTo: { type: String, required: true },
    done: { type: Boolean, required: true, default: false },
  },
  { timeStamps: true }
);

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

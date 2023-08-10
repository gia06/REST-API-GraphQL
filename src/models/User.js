import { sequelize } from "../db/connection.js";
import { Task } from "./Task.js";
import { DataTypes } from "sequelize";

export const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  email: DataTypes.STRING,
  password: DataTypes.STRING,
});

User.hasMany(Task);
Task.belongsTo(User, {
  onDelete: "CASCADE",
  foreignKey: {
    allowNull: false,
  },
});

sequelize.sync();

import mongoose from "mongoose";

const TaskSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    belongsTo: { type: String, required: true },
    done: { type: Boolean, required: true, default: false },
  },
  { timeStamps: true }
);

export const TaskModel = mongoose.model("Task", TaskSchema);

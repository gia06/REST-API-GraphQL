import mongoose from "mongoose";

// class Task {
//   constructor(title, description, belongsTo) {
//     this.id = this.generateId();
//     this.title = title;
//     this.description = description;
//     this.belongsTo = belongsTo;
//     this.isDone = false;
//   }

//   generateId() {
//     return v4();
//   }
// }

const TaskSchema = mongoose.Schema(
  {
    title: { type: String, required: true, index: { unique: true } },
    description: { type: String, required: true },
    belongsTo: { type: String, required: true },
    isDone: { type: Boolean, required: true, default: false },
  },
  { timeStamps: true }
);

export const TaskModel = mongoose.model("Task", TaskSchema);

import { v4 } from "uuid";

class Task {
  constructor(title, description, belongsTo) {
    this.id = this.generateId();
    this.title = title;
    this.description = description;
    this.belongsTo = belongsTo;
    this.isDone = false;
  }

  generateId() {
    return v4();
  }
}

export default Task;

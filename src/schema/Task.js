const { v4 } = require("uuid");

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

module.exports = Task;

import { Task } from "../models/Task.js";

class TasksRepository {
  constructor(model) {
    this.model = model;
  }
  /**
   * Add a new task item
   * @param {*} task The task object to add
   */
  async save({ title, description, id }) {
    const newTask = this.model.build({ title, description, UserId: id });
    await newTask.save();
  }

  /**
   * Find all tasks which belongs to the user
   * @param {*} userId The id of the user
   */
  async findAll(userId) {
    const tasks = await this.model.findAll({
      where: { UserId: userId, done: false },
      order: [["createdAt", "DESC"]],
      attributes: ["title", "description", "done"],
    });
    return tasks;
  }

  /**
   * Find tasks which belongs to the user marked as done
   * @param {*} userId The id of the user
   */
  async findDone(userId) {
    const tasks = await this.model.findAll({
      where: { UserId: userId, done: true },
      attributes: ["title", "description", "done"],
    });

    return tasks;
  }

  /**
   * Find  task by title
   * @param {*} title The title of the task
   * @param {*} userId The id of the user
   */
  async findByTitle(title, UserId) {
    const task = await this.model.findOne({ where: { title, UserId } });
    return task;
  }

  /**
   * Updates task isDone to true value
   * @param {*} title The title object
   * @param {*} UserId The id of the user
   */
  async markDone(title, UserId) {
    const task = await this.model.findOne({
      where: {
        title,
        UserId,
      },
    });

    task.done = true;

    await task.save();
  }

  /**
   * Updates task isDone to true value
   * @param {*} title The title object
   * @param {*} userID The id of the user
   */
  async update(oldTitle, newTitle, description, userId) {
    const task = await this.model.findOne({
      where: { title: oldTitle, UserId: userId },
    });

    task.title = newTitle;
    task.description = description;

    await task.save();
  }

  /**
   * deletes a task
   * @param {*} title The title object
   * @param {*} userID The id of the user
   */
  async delete(taskId, userId) {
    await this.model.destroy({ where: { id: taskId, UserId: userId } });
  }
}

export const tasksRepository = new TasksRepository(Task);

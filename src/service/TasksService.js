import { TaskModel } from "../models/Task.js";

/**
 * Logic for fetching tasks information
 */
class TasksService {
  /**
   * Add a new task item
   * @param {*} task The task object to add
   */
  async save({ title, description, id }) {
    const newTask = new TaskModel({ title, description, belongsTo: id });
    await newTask.save();
  }

  /**
   * Find all tasks which belongs to the user
   * @param {*} userId The id of the user
   */
  async findAll(userId) {
    const tasks = await TaskModel.find({ belongsTo: userId, isDone: false });
    // console.log(tasks);
    return tasks;
  }

  /**
   * Find tasks which belongs to the user marked as done
   * @param {*} userId The id of the user
   */
  async findDone(userId) {
    const tasks = await TaskModel.find({ belongsTo: userId, isDone: true });

    return tasks;
  }

  /**
   * Find  task by title
   * @param {*} title The title of the task
   * @param {*} userId The id of the user
   */
  async findByTitle(title, userId) {
    const user = await TaskModel.findOne({ belongsTo: userId, title });

    return user;
  }

  /**
   * Updates task isDone to true value
   * @param {*} title The title object
   * @param {*} userID The id of the user
   */
  async markDone(title, userId) {
    const task = await TaskModel.findOne({ title, belongsTo: userId });

    task.isDone = true;
    await task.save();
  }

  /**
   * Updates task isDone to true value
   * @param {*} title The title object
   * @param {*} userID The id of the user
   */
  async update(oldTitle, newTitle, description, userId) {
    const task = await TaskModel.findOne({
      title: oldTitle,
      belongsTo: userId,
    });

    task.title = newTitle;
    task.description = description;

    await task.save();
  }

  /**
   * Updates task isDone to true value
   * @param {*} title The title object
   * @param {*} userID The id of the user
   */
  async delete(taskId, userId) {
    const task = await TaskModel.findOneAndDelete({
      _id: taskId,
      belongsTo: userId,
    });
    console.log(task);
  }
}

const tasksService = new TasksService("./src/db/tasks.json");

export default tasksService;

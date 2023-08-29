import { tasksRepository } from "../repository/tasksRepository.js";

/**
 * Logic for fetching tasks information
 */
class TasksService {
  /**
   * Add a new task item
   * @param {*} task The task object to add
   */
  async save({ title, description, userId }) {
    const newTask = await tasksRepository.save({ title, description, userId });
    return newTask;
  }

  /**
   * Find all tasks which belongs to the user
   * @param {*} userId The id of the user
   */
  async findAll(userId) {
    return await tasksRepository.findAll(userId);
  }

  /**
   * Find tasks which belongs to the user marked as done
   * @param {*} userId The id of the user
   */
  async findDone(userId) {
    return await tasksRepository.findDone(userId);
  }

  /**
   * Find  task by title
   * @param {*} title The title of the task
   * @param {*} userId The id of the user
   */
  async findByTitle(title, userId) {
    return await tasksRepository.findByTitle(title, userId);
  }

  /**
   * Find  task by id
   * @param {*} id The id of the task
   */
  async findById(taskId, userId) {
    return await tasksRepository.findById(taskId, userId);
  }

  /**
   * Updates task isDone to true value
   * @param {*} title The title object
   * @param {*} userID The id of the user
   */
  async markDone(title, userId) {
    await tasksRepository.markDone(title, userId);
  }

  /**
   * Updates task isDone to true value
   * @param {*} title The title object
   * @param {*} userID The id of the user
   */
  async update(taskId, newTitle, newDescription, done, userId) {
    return await tasksRepository.update(
      taskId,
      newTitle,
      newDescription,
      done,
      userId
    );
  }

  /**
   * deletes a task
   * @param {*} title The title object
   * @param {*} userID The id of the user
   */
  async delete(taskId, userId) {
    await tasksRepository.delete(taskId, userId);
  }
}

const tasksService = new TasksService();

export default tasksService;

const fs = require("fs");
const util = require("util");

/**
 * We want to use async/await with fs.readFile - util.promisfy gives us that
 */
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

/**
 * Logic for fetching tasks information
 */
class TasksService {
  /**
   * Constructor
   * @param {*} dataFile Path to a JSOn file that contains the tasks data
   */
  constructor(dataFile) {
    this.dataFile = dataFile;
  }

  /**
   * Add a new task item
   * @param {*} task The task object to add
   */
  async save(task) {
    const { tasks } = await this.getData();
    tasks.push(task);
    return writeFile(this.dataFile, JSON.stringify({ tasks }));
  }

  /**
   * Find all tasks which belongs to the user
   * @param {*} userId The id of the user
   */
  async findAll(userId) {
    const { tasks } = await this.getData();
    const result = tasks.filter(
      (task) => task.belongsTo === userId && task.isDone === false
    );
    return result;
  }

  /**
   * Find tasks which belongs to the user marked as done
   * @param {*} userId The id of the user
   */
  async findDone(userId) {
    const { tasks } = await this.getData();

    const result = tasks.filter(
      (task) => task.belongsTo === userId && task.isDone === true
    );

    return result;
  }

  /**
   * Find  task by title
   * @param {*} title The title of the task
   * @param {*} userId The id of the user
   */
  async findByTitle(title, userId) {
    const { tasks } = await this.getData();
    const result = tasks.find(
      (task) => task.title === title && task.belongsTo === userId
    );
    return result;
  }

  /**
   * Updates task isDone to true value
   * @param {*} title The title object
   * @param {*} userID The id of the user
   */
  async markDone(title, userId) {
    const { tasks } = await this.getData();

    const task = tasks.find(
      (task) => task.title === title && task.belongsTo === userId
    );

    task.isDone = true;

    return writeFile(this.dataFile, JSON.stringify({ tasks }));
  }

  /**
   * Updates task isDone to true value
   * @param {*} title The title object
   * @param {*} userID The id of the user
   */
  async update(oldTitle, newTitle, description, userId) {
    const { tasks } = await this.getData();

    const task = tasks.find(
      (task) => task.title === oldTitle && task.belongsTo === userId
    );

    task.title = newTitle;
    task.description = description;

    return writeFile(this.dataFile, JSON.stringify({ tasks }));
  }

  /**
   * Updates task isDone to true value
   * @param {*} title The title object
   * @param {*} userID The id of the user
   */
  async delete(title, userId) {
    const { tasks } = await this.getData();

    const taskIndex = tasks.findIndex(
      (task) => task.title === title && task.belongsTo === userId
    );

    tasks.splice(taskIndex, 1);

    await writeFile(this.dataFile, JSON.stringify({ tasks }));
  }

  /**
   * Fetches speakers data from the JSON file provided to the constructor
   */
  async getData() {
    const data = await readFile(this.dataFile, "utf8");
    return JSON.parse(data);
  }
}

const tasksService = new TasksService("./src/db/tasks.json");

module.exports = tasksService;

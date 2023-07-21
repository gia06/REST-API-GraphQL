const fs = require("fs");
const util = require("util");

/**
 * We want to use async/await with fs.readFile - util.promisfy gives us that
 */
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

/**
 * Logic for fetching speakers information
 */
class UserService {
  /**
   * Constructor
   * @param {*} dataFile Path to a JSOn file that contains the speakers data
   */
  constructor(dataFile) {
    this.dataFile = dataFile;
  }

  /**
   * Get a list of tasks with status done
   */
  async getDoneTasks() {
    const data = await this.getData();
    const doneTasks = data.filter((task) => task.status === "done");
    return doneTasks;
  }

  /**
   * Get a list of tasks with status active
   */
  async getActiveTasks() {
    const data = await this.getData();
    const ActiveTasks = data.filter((task) => task.status === "active");
    return ActiveTasks;
  }

  /**
   * Add a new task item
   * @param {*} task The description of the task
   * @param {*} status The status of the task
   */
  async addEntry(task, status = "active") {
    const data = (await this.getData()) || [];
    // data.unshift({ task, status });
    data.push({ task, status });
    return writeFile(this.dataFile, JSON.stringify({ tasks: data }));
  }

  /**
   * Updates task status to opposite value
   * @param {*} taskName The name of the task
   */
  async updateStatus(taskName) {
    const data = await this.getData();

    const task = data.find((item) => item.task === taskName);
    if (task.status === "active") {
      task.status = "done";
    } else {
      task.status = "active";
    }

    return writeFile(this.dataFile, JSON.stringify({ tasks: data }));
  }

  /**
   * Find a task by the name
   * @param {*} name The name of the task
   */
  async findByName(taskName) {
    const data = await this.getData();
    const result = data.find((item) => item.task === taskName);
    return result;
  }

  /**
   * Fetches speakers data from the JSON file provided to the constructor
   */
  async getData() {
    const data = await readFile(this.dataFile, "utf8");
    return JSON.parse(data).tasks;
  }
}

module.exports = TasksService;

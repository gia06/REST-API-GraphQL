import fs from "fs";
import util from "util";

/**
 * We want to use async/await with fs.readFile - util.promisfy gives us that
 */
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

/**
 * Logic for fetching users information
 */
class UsersService {
  /**
   * Constructor
   * @param {*} dataFile Path to a JSOn file that contains the users data
   */
  constructor(dataFile) {
    this.dataFile = dataFile;
  }

  /**
   * Add a new task item
   * @param {*} user The User object to add
   */
  async save(user) {
    const { users } = await this.getData();
    users.push(user);
    return writeFile(this.dataFile, JSON.stringify({ users }));
  }

  /**
   * Find a user by the id
   * @param {*} id The id of the user
   */
  async findById(id) {
    const { users } = await this.getData();
    const result = users.find((user) => user.id === id);
    return result;
  }

  /**
   * Find a user by the email
   * @param {*} email The email of the user
   */
  async findByEmail(email) {
    const { users } = await this.getData();
    const result = users.find((user) => user.email === email);
    return result;
  }

  /**
   * Fetches speakers data from the JSON file provided to the constructor
   */
  async getData() {
    const data = await readFile(this.dataFile, "utf8");
    return JSON.parse(data);
  }
}

const usersService = new UsersService("./src/db/users.json");

export default usersService;

import { User } from "../models/User.js";
import { generateHash, comparePassword } from "../hash/index.js";

class UsersRepository {
  constructor(model) {
    this.model = model;
  }

  /**
   * Add a new task item
   * @param {*} user The User object to add
   */
  async create(user) {
    const newUser = this.model.build(user);
    newUser.password = await generateHash(newUser.password);
    await newUser.save();
  }

  /**
   * Find a user by the id
   * @param {*} id The id of the user
   */
  async findById(id) {
    const user = await this.model.findOne({ where: { id } });
    return user;
  }

  /**
   * Find a user by the email
   * @param {*} email The email of the user
   */
  async findByEmail(email) {
    const user = await this.model.findOne({ where: { email } });
    return user;
  }

  async comparePassword(password, storedPassword) {
    return await comparePassword(password, storedPassword);
  }
}

export const usersRepository = new UsersRepository(User);

import { UserModel } from "../models/User.js";

/**
 * Logic for fetching users information
 */
class UsersService {
  /**
   * Add a new task item
   * @param {*} user The User object to add
   */
  async create(user) {
    const newUser = new UserModel(user);
    await newUser.save();
  }

  /**
   * Find a user by the id
   * @param {*} id The id of the user
   */
  async findById(id) {
    const user = await UserModel.findOne({ _id: id });
    return user;
  }

  /**
   * Find a user by the email
   * @param {*} email The email of the user
   */
  async findByEmail(email) {
    const user = await UserModel.findOne({ email });
    return user;
  }

  async comparePassword(password) {
    return UserModel.comparePassword(password);
  }
}

const usersService = new UsersService("./src/db/users.json");

export default usersService;

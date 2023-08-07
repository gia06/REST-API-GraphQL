import { usersRepository } from "../repository/UsersRepository.js";

/**
 * Logic for fetching users information
 */
class UsersService {
  /**
   * Add a new task item
   * @param {*} user The User object to add
   */
  async create(user) {
    await usersRepository.create(user);
  }

  /**
   * Find a user by the id
   * @param {*} id The id of the user
   */
  async findById(id) {
    return await usersRepository.findById(id);
  }

  /**
   * Find a user by the email
   * @param {*} email The email of the user
   */
  async findByEmail(email) {
    return await usersRepository.findByEmail(email);
  }

  async comparePassword(password) {
    return await usersRepository.comparePassword(password);
  }
}

const usersService = new UsersService();

export default usersService;

import { v4 } from "uuid";
import bcrypt from "bcrypt";

class User {
  constructor(name, surname, email, password) {
    return (async () => {
      this.id = this.generateId();
      this.name = name;
      this.surname = surname;
      this.email = email;
      this.password = await this.hashPassword(password);
      return this;
    })();
  }

  /**
   * generate unique id for user
   */
  generateId() {
    return v4();
  }

  /**
   * compares plain password text to hash
   * @param {*} password The plain text password of the user
   */
  hashPassword(password) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, Number(process.env.SALT_ROUNDS), (err, hash) => {
        if (err) {
          return reject(err);
        }
        return resolve(hash);
      });
    });
  }
}

export default User;

const bcrypt = require("bcrypt");

module.exports = (plainPassword, passwordHash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plainPassword, passwordHash, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

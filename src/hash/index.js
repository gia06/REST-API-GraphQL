import bcrypt from "bcrypt";

export const generateHash = (password) => {
  return bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
};

export const comparePassword = function comparePassword(
  candidatePassword,
  storedPassword
) {
  return bcrypt.compare(candidatePassword, storedPassword);
};

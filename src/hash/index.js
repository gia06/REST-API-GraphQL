import bcrypt from "bcrypt";

export const generateHash = async (password) => {
  return bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
};

export const comparePassword = async function comparePassword(
  candidatePassword,
  storedPassword
) {
  return bcrypt.compare(candidatePassword, storedPassword);
};

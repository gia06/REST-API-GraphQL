import bcrypt from "bcrypt";
import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    // name: { type: String, required: true },
    // surname: { type: String, required: true },
    email: {
      type: String,
      required: true,
      index: { unique: true },
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, trim: true },
  },
  { timeStamps: true }
);

const generateHash = async (password) => {
  return bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
};

UserSchema.pre("save", function preSave(next) {
  const user = this;

  // Only create a new password hash if the field was updated
  if (user.isModified("password")) {
    return generateHash(user.password)
      .then((hash) => {
        user.password = hash;
        return next();
      })
      .catch((error) => {
        return next(error);
      });
  }
  return next();
});

UserSchema.methods.comparePassword = async function comparePassword(
  candidatePassword
) {
  return bcrypt.compare(candidatePassword, this.password);
};

export const UserModel = mongoose.model("User", UserSchema);

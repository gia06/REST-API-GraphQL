import bcrypt from "bcrypt";
import mongoose from "mongoose";

// class User {
//   constructor(name, surname, email, password) {
//     return (async () => {
//       this.id = this.generateId();
//       this.name = name;
//       this.surname = surname;
//       this.email = email;
//       this.password = await this.hashPassword(password);
//       return this;
//     })();
//   }

//   /**
//    * generate unique id for user
//    */
//   generateId() {
//     return v4();
//   }

//   /**
//    * compares plain password text to hash
//    * @param {*} password The plain text password of the user
//    */
//   hashPassword(password) {
//     return new Promise((resolve, reject) => {
//       bcrypt.hash(password, Number(process.env.SALT_ROUNDS), (err, hash) => {
//         if (err) {
//           return reject(err);
//         }
//         return resolve(hash);
//       });
//     });
//   }
// }

const UserSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
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

import mongoose from "mongoose";

export const connectToMongoose = () => {
  return mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

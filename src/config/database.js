import mongoose from "mongoose";

export const connectToDB = async () => {
  const mongoDbUrl = process.env.MONGODB_URL;

  try {
    await mongoose.connect(mongoDbUrl);
    console.log(`Database connected successfully!🚀`);
  } catch (err) {
    console.error(err);
  }
};

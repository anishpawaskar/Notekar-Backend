import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  pictureUrl: String,
  email: String,
  hashPassword: String,
});

const Users = mongoose.model("users", UsersSchema);

export const createNewUserModel = async (body) => {
  const newUser = await Users(body);
  return await newUser.save();
};

export const getUserByEmailModel = async (email) => {
  return await Users.findOne({ email });
};

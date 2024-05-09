import { createNewUserModel, getUserByEmailModel } from "../models/users.js";

export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, ...rest } = req.body;

    const existingEmail = await getUserByEmailModel(email);
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = await createNewUserModel({
      firstName,
      lastName,
      email,
      password,
      ...rest,
    });

    if (newUser) {
      return res.status(201).json({ message: "User register successfully." });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json("Internal server error!");
  }
};

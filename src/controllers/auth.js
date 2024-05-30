import { createNewUserModel, getUserByEmailModel } from "../models/users.js";
import { generateHashPassword, generateJwt } from "../utils/auth.js";

export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingEmail = await getUserByEmailModel(email);
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = await createNewUserModel({
      firstName,
      lastName,
      email,
      hashPassword: await generateHashPassword(password),
    });

    if (newUser) {
      const user = { firstName, lastName, email };
      const token = generateJwt(user);
      console.log("token", token);
      res.cookie(process.env.COOKIE_NAME, token, { httpOnly: true });

      return res
        .status(201)
        .json({ message: "User register successfully.", user });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json("Internal server error!");
  }
};

import { createNewUserModel, getUserByEmailModel } from "../models/users.js";
import {
  compareHashPassword,
  generateHashPassword,
  generateJwt,
} from "../utils/auth.js";

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
      const user = { id: newUser._id, firstName, lastName, email };
      const token = generateJwt(user);
      res.cookie(process.env.COOKIE_NAME, token, { httpOnly: true });

      return res.status(201).json({
        message: "User register successfully.",
        userData: { id: newUser._id, ...user },
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json("Internal server error!");
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmailModel(email);

    if (!user) {
      return res.status(404).json({ message: "User does not exist!" });
    }

    if (!password) {
      return res.status(400).json({ message: "Wrong password!" });
    }

    const matchPassowrd = await compareHashPassword(
      password,
      user.hashPassword
    );

    if (!matchPassowrd) {
      return res.status(401).json({ message: "Email or password is invalid." });
    }

    const payload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    const token = generateJwt(payload);
    res.cookie(process.env.COOKIE_NAME, token, { httpOnly: true });

    if (user.pictureUrl) {
      return res.status(200).json({
        message: "User login successfully!",
        userData: { id: user.id, pictureUrl: user.pictureUrl, ...payload },
      });
    } else {
      return res.status(200).json({
        message: "User login successfully!",
        userData: { id: user.id, ...payload },
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const singOutUser = (req, res) => {
  try {
    const cookieName = process.env.COOKIE_NAME;
    res.clearCookie(cookieName, { httpOnly: true });
    res.status(200).json({ message: "User logout successfully." });
  } catch (err) {
    console.log("err", err);
    res.status(500).json({ message: "Error while logging out user." });
  }
};

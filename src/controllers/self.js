import { findUserByIdAndUpdateModel, getUserById } from "../models/users.js";

export const getSelfDetails = async (req, res) => {
  try {
    const { id } = req.userData;
    const user = await getUserById({ _id: id });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const payload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

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
    return res
      .status(500)
      .json({ message: "Error while getting self details." });
  }
};

export const updateSelfDetails = async (req, res) => {
  try {
    const body = req.body;
    const { id } = req.userData;
    const updateUser = await findUserByIdAndUpdateModel({ _id: id }, body);

    return res.status(201).json({
      message: "User details updated successfully.",
      id: updateUser._id,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Error while updating self details." });
  }
};

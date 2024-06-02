import {
  createNewLabelModel,
  findLabelByIdAndDeleteModel,
  findLabelByIdAndUpdateModel,
  getLabelModel,
  getLabelsModel,
} from "../models/labels.js";

export const createLabel = async (req, res) => {
  try {
    const { id: userId } = req.userData;
    const { name } = req.body;
    const label = await getLabelModel({ name: name, userId });

    if (label) {
      return res.status(400).json({ message: "Label already exists" });
    }

    const newLabel = await createNewLabelModel({
      name,
      userId,
    });

    if (newLabel) {
      return res
        .status(201)
        .json({ message: "New label created", label: newLabel });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error while creating request." });
  }
};

export const getLabels = async (req, res) => {
  try {
    const { id: userId } = req.userData;
    const labels = await getLabelsModel({ userId });
    return res
      .status(200)
      .json({ message: "Labels returnd successfully.", labels });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error while fetching request." });
  }
};

export const updteLabel = async (req, res) => {
  try {
    const { id: userId } = req.userData;
    const labelId = req.params.id;
    const { name } = req.body;

    const updatedLabel = await findLabelByIdAndUpdateModel(
      { _id: labelId, userId },
      { name }
    );

    if (!updatedLabel) {
      return res.status(404).json({ message: "Label not found." });
    }

    return res
      .status(201)
      .json({ message: "Label updated successfully.", label: updatedLabel });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error while updating request." });
  }
};

export const deleteLabel = async (req, res) => {
  try {
    const labelId = req.params.id;
    const deletedNote = await findLabelByIdAndDeleteModel({ _id: labelId });

    if (!deletedNote) {
      return res.status(404).json({ message: "Label not found." });
    }

    return res
      .status(200)
      .json({ message: "Label deleted successfully.", label: deletedNote._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error while deleting request." });
  }
};

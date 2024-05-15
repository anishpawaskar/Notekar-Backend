import {
  createNewLabelModel,
  getLabelModel,
  getLabelsModel,
} from "../models/labels.js";

export const createLabel = async (req, res) => {
  try {
    const { name } = req.body;
    const label = await getLabelModel({ name: req.body.name });

    if (label) {
      return res.status(400).json({ message: "Label already exists" });
    }

    const newLabel = await createNewLabelModel({
      name,
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
    const labels = await getLabelsModel();
    return res
      .status(200)
      .json({ message: "Labels returnd successfully.", labels });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error while fetching request." });
  }
};

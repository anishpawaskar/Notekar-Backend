import mongoose from "mongoose";

const LabelsSchema = new mongoose.Schema(
  {
    name: String,
  },
  { timestamps: true }
);

const Labels = mongoose.model("Labels", LabelsSchema);

export const createNewLabelModel = async (payload) => {
  const newLabel = await Labels(payload);
  return await newLabel.save();
};

export const getLabelsModel = async () => {
  return await Labels.find({});
};

export const getLabelModel = async (body) => {
  try {
    const label = await Labels.findOne(body);

    if (!label) {
      return null;
    }

    return label;
  } catch (err) {
    if (err instanceof mongoose.CastError) {
      throw new Error("Item not found");
    }

    throw err;
  }
};

export const findLabelByIdAndUpdateModel = async (filter, body) => {
  try {
    const updateLabel = await Labels.findByIdAndUpdate(filter, body, {
      new: true,
    });

    if (!updateLabel) {
      return null;
    }

    return await updateLabel.save();
  } catch (err) {
    if (err instanceof mongoose.CastError) {
      throw new Error("Item not found");
    }

    throw err;
  }
};

export const findLabelByIdAndDeleteModel = async (filter) => {
  try {
    const deleteLabel = await Labels.findByIdAndDelete(filter);

    if (!deleteLabel) {
      return null;
    }

    return deleteLabel;
  } catch (err) {
    if (err instanceof mongoose.CastError) {
      throw new Error("Item not found");
    }

    throw err;
  }
};

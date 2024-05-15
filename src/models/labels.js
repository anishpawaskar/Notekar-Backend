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
  return await Labels.findOne(body);
};

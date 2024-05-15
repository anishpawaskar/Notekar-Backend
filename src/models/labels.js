import mongoose from "mongoose";

const LabelsSchema = new mongoose.Schema({
  name: String,
});

const Labels = mongoose.model("Labels", LabelsSchema);

export const createNewLabelModel = async (payload) => {
  const newLabel = await Labels(payload);
  return await newLabel.save();
};

export const getLabelModel = async (body) => {
  return await Labels.findOne(body);
};

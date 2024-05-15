import mongoose from "mongoose";

const LabelsSchema = new mongoose.Schema({
  name: String,
  query: String,
});

const Labels = mongoose.model("Labels", LabelsSchema);

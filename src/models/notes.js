import mongoose from "mongoose";

const NotesSchema = mongoose.Schema(
  {
    title: String,
    description: String,
    states: {
      isDeleted: Boolean,
    },
  },
  { timestamps: true }
);

const Notes = mongoose.model("notes", NotesSchema);

export const createNewNoteModel = async (payload) => {
  const newNote = new Notes(payload);
  return await newNote.save();
};

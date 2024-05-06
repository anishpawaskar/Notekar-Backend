import mongoose from "mongoose";

const NotesSchema = new mongoose.Schema(
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

export const getAllNotesModel = async () => {
  const notes = await Notes.find({});
  return notes;
};

export const findNoteByIdAndUpdateModel = async (filter, value) => {
  try {
    const updatedNote = await Notes.findByIdAndUpdate(filter, value, {
      new: true,
    });

    return await updatedNote.save();
  } catch (err) {
    if (err instanceof mongoose.CastError) {
      throw new Error("Item not found");
    }

    throw err;
  }
};
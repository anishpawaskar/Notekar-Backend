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

export const getNoteModel = async (filter) => {
  try {
    const note = await Notes.findById(filter);

    if (!note) {
      return null;
    }

    return note;
  } catch (err) {
    if (err instanceof mongoose.CastError) {
      throw new Error("Item not found");
    }

    throw err;
  }
};

export const findNoteByIdAndUpdateModel = async (filter, value) => {
  try {
    const updatedNote = await Notes.findByIdAndUpdate(filter, value, {
      new: true,
    });

    if (!updatedNote) {
      return null;
    }

    return await updatedNote.save();
  } catch (err) {
    if (err instanceof mongoose.CastError) {
      throw new Error("Item not found");
    }

    throw err;
  }
};

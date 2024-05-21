import mongoose from "mongoose";

const NotesSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    imageUrl: String,
    theme: {
      backgroundColor: String,
      hoverBackgroundColor: String,
    },
    states: {
      isArchived: Boolean,
    },
    labels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Labels",
      },
    ],
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
    const appliedLabels = value.appliedLabels;
    let updatedNote;
    if (appliedLabels.length > 0) {
      updatedNote = await Notes.findByIdAndUpdate(
        filter,
        {
          $push: { labels: { $each: appliedLabels } },
          ...value,
        },
        {
          new: true,
        }
      );
    } else {
      updatedNote = await Notes.findByIdAndUpdate(filter, value, {
        new: true,
      });
    }

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

export const findNoteByIdAndDeleteModel = async (filter) => {
  try {
    const deletedNote = await Notes.findOneAndDelete(filter);

    if (!deletedNote) {
      return null;
    }

    return deletedNote;
  } catch (err) {
    if (err instanceof mongoose.CastError) {
      throw new Error("Item not found");
    }

    throw err;
  }
};

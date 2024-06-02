import {
  createNewNoteModel,
  findNoteByIdAndDeleteModel,
  findNoteByIdAndUpdateModel,
  findNoteByIdAndWithUniqueLabels,
  getAllNotesModel,
  getNoteModel,
} from "../models/notes.js";

export const createNotes = async (req, res) => {
  try {
    const { id: userId } = req.userData;
    const payload = req.body;
    const note = await createNewNoteModel({ userId, ...payload });

    if (note) {
      return res.status(201).json({ message: "New note created.", note });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json("Internal server error!");
  }
};

export const getAllNotes = async (req, res) => {
  try {
    const { id: userId } = req.userData;
    const notes = await getAllNotesModel({ userId });
    if (notes) {
      return res
        .status(200)
        .json({ message: "Notes returned successfully.", notes });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json("Internal server error!");
  }
};

export const getNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const note = await getNoteModel({ _id: noteId });

    if (!note) {
      return res.status(404).json({ message: "Note not found." });
    }

    return res
      .status(200)
      .json({ message: "Note returned successfully.", note });
  } catch (err) {
    console.error(err);

    if (err.message === "Item not found") {
      return res.status(404).json({ message: "Note not found." });
    }

    return res.status(500).json("Internal server error!");
  }
};

export const updateNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const labelsToAdd = req.body.labelsToAdd;
    const labelsToDelete = req.body.labelsToDelete;
    const body = req.body;

    if (labelsToAdd) {
      if (labelsToAdd.length > 0) {
        const noteWithUniqueLabel = await findNoteByIdAndWithUniqueLabels(
          noteId,
          labelsToAdd
        );

        if (noteWithUniqueLabel) {
          return res.status(400).json({ message: "Labels already exists." });
        }
      }
    }

    if (labelsToDelete) {
      if (labelsToDelete.length > 0) {
        const noteWithLabelForDeletion = await findNoteByIdAndWithUniqueLabels(
          noteId,
          labelsToDelete
        );

        if (!noteWithLabelForDeletion) {
          return res
            .status(400)
            .json({ message: "Label for deletion is not exists." });
        }
      }
    }

    const updatedNote = await findNoteByIdAndUpdateModel({ _id: noteId }, body);

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found." });
    }

    return res
      .status(201)
      .json({ message: "Note updated successfully.", note: updatedNote });
  } catch (err) {
    console.error(err);

    if (err.message === "Item not found") {
      return res.status(404).json({ message: "Note not found." });
    }

    return res.status(500).json("Internal server error!");
  }
};

export const deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const deletedNote = await findNoteByIdAndDeleteModel({ _id: noteId });

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found." });
    }

    return res.status(200).json({ message: "Note deleted successfully" });
  } catch (err) {
    console.error(err);

    if (err.message === "Item not found") {
      return res.status(404).json({ message: "Note not found." });
    }

    return res.status(500).json("Internal server error!");
  }
};

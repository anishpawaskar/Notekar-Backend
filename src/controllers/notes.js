import { createNewNoteModel } from "../models/notes.js";

export const createNotes = async (req, res) => {
  try {
    const payload = req.body;
    const note = await createNewNoteModel(payload);

    if (note) {
      return res.status(201).json({ message: "New note created.", note });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json("Internal server error!");
  }
};

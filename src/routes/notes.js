import express from "express";
import { createNotes, getAllNotes, updateNote } from "../controllers/notes.js";
import { filterOutEmptyProperties } from "../middlewares/filterOutEmptyProperties.js";

const router = express.Router();

router.get("/", getAllNotes);

router.post("/", filterOutEmptyProperties, createNotes);

router.put("/:id", filterOutEmptyProperties, updateNote);

router.delete("/:id", (req, res) => {
  res.send("Delete selected note by id");
});

export default router;

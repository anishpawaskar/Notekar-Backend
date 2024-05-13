import express from "express";
import {
  createNotes,
  deleteNote,
  getAllNotes,
  getNote,
  updateNote,
} from "../controllers/notes.js";
import { filterOutEmptyProperties } from "../middlewares/filterOutEmptyProperties.js";

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNote);
router.post("/", createNotes);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;

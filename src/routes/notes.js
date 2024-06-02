import express from "express";
import {
  createNotes,
  deleteNote,
  getAllNotes,
  getNote,
  updateNote,
} from "../controllers/notes.js";
import { verifyJwt } from "../utils/auth.js";

const router = express.Router();

router.get("/", verifyJwt, getAllNotes);
router.get("/:id", getNote);
router.post("/", verifyJwt, createNotes);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;

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
router.get("/:id", verifyJwt, getNote);
router.post("/", verifyJwt, createNotes);
router.put("/:id", verifyJwt, updateNote);
router.delete("/:id", verifyJwt, deleteNote);

export default router;

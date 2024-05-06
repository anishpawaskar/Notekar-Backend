import express from "express";
import { createNotes, getAllNotes } from "../controllers/notes.js";
import { filterOutEmptyProperties } from "../middlewares/filterOutEmptyProperties.js";

const router = express.Router();

router.get("/", getAllNotes);

router.post("/", filterOutEmptyProperties, createNotes);

router.put("/:id", (req, res) => {
  res.send("Update post selected by id");
});

router.delete("/:id", (req, res) => {
  res.send("Delete selected note by id");
});

export default router;

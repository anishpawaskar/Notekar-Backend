import express from "express";
import { createNotes } from "../controllers/notes.js";
import { filterOutEmptyProperties } from "../middlewares/filterOutEmptyProperties.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Get all todos");
});

router.post("/", filterOutEmptyProperties, createNotes);

router.put("/:id", (req, res) => {
  res.send("Update post selected by id");
});

router.delete("/:id", (req, res) => {
  res.send("Delete selected note by id");
});

export default router;

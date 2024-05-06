import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Get all todos");
});

router.post("/", (req, res) => {
  res.send("Create new note");
});

router.put("/:id", (req, res) => {
  res.send("Update post selected by id");
});

router.delete("/:id", (req, res) => {
  res.send("Delete selected note by id");
});

export default router;

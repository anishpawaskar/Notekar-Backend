import express from "express";
import { createLabels } from "../controllers/labels.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("get all labels");
});

router.post("/", createLabels);

router.put("/:labelId", (req, res) => {
  res.send("Update label");
});

export default router;

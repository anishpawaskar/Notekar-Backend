import express from "express";
import {
  createLabel,
  deleteLabel,
  getLabels,
  updteLabel,
} from "../controllers/labels.js";

const router = express.Router();

router.get("/", getLabels);
router.post("/", createLabel);
router.put("/:id", updteLabel);
router.delete("/:id", deleteLabel);

export default router;

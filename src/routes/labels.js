import express from "express";
import { createLabel, getLabels } from "../controllers/labels.js";

const router = express.Router();

router.get("/", getLabels);
router.post("/", createLabel);

router.put("/:labelId", (req, res) => {
  res.send("Update label");
});

export default router;

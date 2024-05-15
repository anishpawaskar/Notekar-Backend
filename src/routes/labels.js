import express from "express";
import { createLabel, getLabels, updteLabel } from "../controllers/labels.js";

const router = express.Router();

router.get("/", getLabels);
router.post("/", createLabel);
router.put("/:id", updteLabel);

export default router;

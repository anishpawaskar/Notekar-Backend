import express from "express";
import {
  createLabel,
  deleteLabel,
  getLabels,
  updteLabel,
} from "../controllers/labels.js";
import { verifyJwt } from "../utils/auth.js";

const router = express.Router();

router.get("/", getLabels);
router.post("/", verifyJwt, createLabel);
router.put("/:id", updteLabel);
router.delete("/:id", deleteLabel);

export default router;

import express from "express";
import {
  createLabel,
  deleteLabel,
  getLabels,
  updteLabel,
} from "../controllers/labels.js";
import { verifyJwt } from "../utils/auth.js";

const router = express.Router();

router.get("/", verifyJwt, getLabels);
router.post("/", verifyJwt, createLabel);
router.put("/:id", verifyJwt, updteLabel);
router.delete("/:id", verifyJwt, deleteLabel);

export default router;

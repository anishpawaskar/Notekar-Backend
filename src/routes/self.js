import express from "express";
import { getSelfDetails } from "../controllers/self.js";
import { verifyJwt } from "../utils/auth.js";

const router = express.Router();

router.get("/", verifyJwt, getSelfDetails);

export default router;

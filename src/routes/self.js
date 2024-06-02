import express from "express";
import { getSelfDetails, updateSelfDetails } from "../controllers/self.js";
import { verifyJwt } from "../utils/auth.js";

const router = express.Router();

router.get("/", verifyJwt, getSelfDetails);
router.put("/", verifyJwt, updateSelfDetails);

export default router;

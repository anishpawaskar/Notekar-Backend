import express from "express";
import { loginUser, registerUser, singOutUser } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/sign-out", singOutUser);

export default router;

import express from "express";
import { registerUser } from "../controllers/auth.js";
import { filterOutEmptyProperties } from "../middlewares/filterOutEmptyProperties.js";

const router = express.Router();

router.post("/register", filterOutEmptyProperties, registerUser);
router.post("/login", (req, res) => {
  res.send("login user");
});

export default router;

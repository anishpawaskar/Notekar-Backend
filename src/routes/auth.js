import express from "express";

const router = express.Router();

router.post("/register", (req, res) => {
  res.send("register user");
});
router.post("/login", (req, res) => {
  res.send("login user");
});

export default router;

import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("get all labels");
});

router.post("/", (req, res) => {
  res.send("create label");
});

router.put("/:labelId", (req, res) => {
  res.send("Update label");
});

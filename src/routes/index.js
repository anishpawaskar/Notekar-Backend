import express from "express";
import notesRoute from "./notes.js";
import authRoute from "./auth.js";

const app = express.Router();

app.use("/notes", notesRoute);
app.use("/auth", authRoute);
app.use("*", (req, res) => {
  res.send("404 not found");
});

export default app;

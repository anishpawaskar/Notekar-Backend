import express from "express";
import notesRoute from "./notes.js";

const app = express.Router();

app.use("/notes", notesRoute);

export default app;

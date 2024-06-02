import express from "express";
import notesRoute from "./notes.js";
import authRoute from "./auth.js";
import labelsRoute from "./labels.js";
import selfRoute from "./self.js";

const app = express.Router();

app.use("/notes", notesRoute);
app.use("/auth", authRoute);
app.use("/labels", labelsRoute);
app.use("/self", selfRoute);
app.use("*", (req, res) => {
  res.send("404 not found");
});

export default app;

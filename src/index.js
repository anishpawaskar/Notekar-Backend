import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectToDB } from "./config/database.js";
import indexRouter from "./routes/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

connectToDB();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(indexRouter);

app.use((err, req, res, next) => {
  if (err) {
    return res.status(500).json({ message: "Currently server is down" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});

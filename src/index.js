import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectToDB } from "./config/database.js";
import indexRouter from "./routes/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*",
  })
);

connectToDB();

app.use(indexRouter);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});

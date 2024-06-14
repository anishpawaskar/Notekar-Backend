import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectToDB } from "./src/config/database.js";
import indexRouter from "./src/routes/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());

connectToDB();

const allowedOrigins = ["http://localhost:5173", "https://notekar.netlify.app"];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  return res.send("<h1>Hello World!</h1>");
});

app.use(indexRouter);

app.use((err, req, res, next) => {
  if (err) {
    return res.status(500).json({ message: "Currently server is down" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});

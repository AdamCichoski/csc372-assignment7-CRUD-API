import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { router as jokeRoutes } from "./routes/jokeRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/jokebook", jokeRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

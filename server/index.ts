import "dotenv/config";
import express = require("express");
import mongoose from "mongoose";
import cors = require("cors");
import authRoutes from "./routes/auth";

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => console.log("MongoDB connected"))
  .catch(console.error);

app.use("/auth", authRoutes);

app.listen(process.env.PORT || 4000, () => {
  console.log("Server running on port 4000");
});

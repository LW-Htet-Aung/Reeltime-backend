import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import metricRoute from "./routes/metricRoute.js";

// const moviesRoutes = require("./routes/movies");

dotenv.config();
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// db connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// routes
app.use("/api/users", userRoutes);
app.use("/api/metrics", metricRoute);
// app.use("/api/movies", moviesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

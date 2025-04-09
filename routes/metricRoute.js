// routes/metrics.js
import express from "express";
import Metric from "../models/Metric.js";

const router = express.Router();

router.post("/search", async (req, res) => {
  try {
    const { searchTerm, movie } = req.body;

    // Check if the movie already exists in the database
    let metric = await Metric.findOne({ searchTerm });

    if (metric) {
      // Increment count for existing metric
      metric.count += 1;
      await metric.save();
      res.status(200).json({ message: "Search count updated", data: metric });
    } else {
      // Create a new metric if it doesn't exist
      const newMetric = new Metric({
        searchTerm,
        movie_id: movie.id,
        title: movie.title,
        count: 1,
        posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
      await newMetric.save();
      res.status(201).json({ message: "New metric created", data: newMetric });
    }
  } catch (error) {
    console.error("Error updating search count:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;

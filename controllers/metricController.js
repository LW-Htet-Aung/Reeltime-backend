import asyncHandler from "express-async-handler";
import Metric from "../models/Metric.js";

const storeMetric = asyncHandler(async (req, res, next) => {
  const { searchTerm, movie } = req.body;

  if (!searchTerm) {
    return res.status(400).json({ message: "Search Term is required" });
  }
  if (!movie) {
    return res.status(400).json({ message: "Movie is required" });
  }
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
});

const getTrendingMovie = asyncHandler(async (req, res, next) => {
  const trendingMovies = await Metric.find().sort({ count: -1 }).limit(5);
  return res
    .status(200)
    .json({ message: "Trending Movies", data: trendingMovies });
});

export { storeMetric, getTrendingMovie };

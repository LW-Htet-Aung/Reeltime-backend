// routes/metrics.js
import express from "express";
import {
  storeMetric,
  getTrendingMovie,
} from "../controllers/metricController.js";

const router = express.Router();

router.post("/search", storeMetric);
router.get("/trending-movies", getTrendingMovie);

export default router;

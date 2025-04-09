import mongoose from "mongoose";

const MetricSchema = new mongoose.Schema({
  searchTerm: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000,
    trim: true,
  },
  count: {
    type: Number,
    default: 0,
  },
  posterUrl: {
    type: String,
    required: true,
    trim: true,
  },
  movie_id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000,
  },
});
export default mongoose.model("Metric", MetricSchema);

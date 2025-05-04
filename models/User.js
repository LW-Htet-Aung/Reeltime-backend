import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  savedMovies: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Movie",
  },
});
export default mongoose.model("User", UserSchema);

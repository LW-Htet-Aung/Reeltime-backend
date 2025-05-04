import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Missing required field: email" });
  }
  const existUser = await User.findOne({ email });
  if (existUser) {
    return res.status(400).json({ message: "Email already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });
  let token;
  if (user) {
    token = generateToken(res, user._id);
  }
  return res.status(200).json({
    message: "User Created",
    token,
    user: { name: user.name, email: user.email, id: user.id },
  });
});
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }
  // Vertify Password
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }
  const token = generateToken(res, user._id);
  return res.status(200).json({
    message: "Successfully Signed In",
    user: { id: user._id, name: user.name, email: user.email },
    token,
  });
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  return res.status(200).json({ message: "Logged out successfully" });
});
export { registerUser, loginUser, logoutUser };

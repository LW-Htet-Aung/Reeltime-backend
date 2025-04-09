import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

const registerUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existUser = await User.findOne({ email });
    console.log(existUser, "user");
    if (existUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    if (user) {
      generateToken(res, user._id);
    }
    return res.status(200).json({ message: "User Created", data: user });
  } catch (error) {
    console.log(error, "[AUTH]: Error signing up");
    return res.status(500).json({ message: "Server Error" });
  }
});
const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body)
    const user = await User.findOne({ email });
    console.log(user,'logn')
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    // Vertify Password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    generateToken(res, user._id);
    return res
      .status(201)
      .json({ message: "Successfully Signed In", data: user });
  } catch (error) {
    console.log(error,'err')
    return res.status(500).json({ message: "Server Error" });
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  return res.status(200).json({ message: "Logged out successfully" });
});
export { registerUser, loginUser, logoutUser };

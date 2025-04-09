import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// sign up route

// router.post("/signup", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const existUser = await User.findOne({ email });

//     if (existUser) {
//       return res.status(400).json({ message: "Email already exists" });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({ email, password: hashedPassword });
//     return res.status(200).json({ message: "User Created" });
//   } catch (error) {
//     console.log(error, "[AUTH]: Error signing up");
//     return res.status(500).json({ message: "Server Error" });
//   }
// });

// sign in
// router.post("/signin", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid Credentials" });
//     }
//     // Vertify Password
//     const passwordMatch = await bcrypt.compare(password, user.password);
//     if (!passwordMatch) {
//       return res.status(400).json({ message: "Invalid Credentials" });
//     }
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "1d",
//     });

//     res.cookie("token", token, { httpOnly: true, secure: true });
//     return res.status(201).json({ message: "Successfully Signed In" });
//   } catch (error) {
//     return res.status(500).json({ message: "Server Error" });
//   }
// });

export default router;

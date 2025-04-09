import express from "express";
import authMiddleware from "../middleware/auth";
const router = express.Router();

router.use(authMiddleware);

module.exports = router;

const { Router } = require("express");
const { generateOutfit, uploadMiddleware } = require("../controllers/imageController");
const { generateLimiter } = require("../middleware/rateLimiter");

const r = Router();

r.post(
  "/generate",
  generateLimiter,
  uploadMiddleware, // 👈 ADD THIS (VERY IMPORTANT)
  generateOutfit
);

module.exports = r;
const Replicate = require("replicate");
const User = require("../models/User");
const Image = require("../models/Image");
const multer = require("multer");

// memory storage (RAM me file store hogi)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// middleware (file upload)
exports.uploadMiddleware = upload.single("image");

// 🔥 POST /api/generate (AI Image Edit)
exports.generateOutfit = async (req, res) => {

  console.log(req.file);

  const apiToken = process.env.REPLICATE_API_TOKEN;

  if (!apiToken) {
    return res.status(500).json({ error: "REPLICATE_API_TOKEN not configured" });
  }

  if (!req.file) {
    return res.status(400).json({ error: "Image file is required" });
  }

  try {
    const replicate = new Replicate({ auth: apiToken });

    // buffer → base64 convert
    const base64 = req.file.buffer.toString("base64");

    const prompt =
      req.body.prompt ||
      "Make this image high-quality, realistic, and visually appealing";

    // 🔥 FIXED MODEL (WORKING)
    const output = await replicate.run(
      "black-forest-labs/flux-dev",
      {
        input: {
          prompt: prompt,
          image: `data:image/jpeg;base64,${base64}`, // 👈 input image
        },
      }
    );

    const imageUrl = Array.isArray(output)
      ? String(output[0])
      : String(output);

    // Save DB (optional user login case)
    if (req.userId) {
      await Image.create({
        userId: req.userId,
        generatedImageUrl: imageUrl,
        prompt: prompt,
        category: "ai-edit",
      });

      await User.findByIdAndUpdate(req.userId, {
        $inc: { credits: -1 },
      });
    }

    res.json({ success: true, imageUrl });

  } catch (err) {
    res.status(500).json({
      error: "Generation failed",
      details: String(err),
    });
  }
};

// 🔥 GET /api/images (User Images)
exports.getImages = async (req, res) => {
  try {
    const images = await Image.find({ userId: req.userId }).sort({
      createdAt: -1,
    });

    res.json(images);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch images" });
  }
};

// 🔥 DELETE /api/images/:id
exports.deleteImage = async (req, res) => {
  try {
    await Image.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete image" });
  }
};
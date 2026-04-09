const mongoose = require("mongoose");
module.exports = mongoose.model("Image", new mongoose.Schema({
  userId:            { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  originalImageUrl:  String,
  generatedImageUrl: { type: String, required: true },
  garmentImageUrl:   String,
  prompt:            String,
  theme:             String,
  category:          { type: String, default: "upper_body" },
}, { timestamps: true }));

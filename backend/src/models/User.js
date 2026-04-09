const mongoose = require("mongoose");
module.exports = mongoose.model("User", new mongoose.Schema({
  name:     { type: String, required: true, trim: true },
  email:    { type: String, required: true, unique: true, lowercase: true },
  password: String,
  googleId: String,
  credits:  { type: Number, default: 5 },
  plan:     { type: String, enum: ["free","basic","pro","premium"], default: "free" },
}, { timestamps: true }));

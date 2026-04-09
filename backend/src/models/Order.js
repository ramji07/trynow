const mongoose = require("mongoose");
module.exports = mongoose.model("Order", new mongoose.Schema({
  userId:            { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  razorpayOrderId:   { type: String, required: true },
  razorpayPaymentId: String,
  razorpaySignature: String,
  amount:            { type: Number, required: true },
  credits:           { type: Number, required: true },
  status:            { type: String, enum: ["pending","paid","failed"], default: "pending" },
}, { timestamps: true }));

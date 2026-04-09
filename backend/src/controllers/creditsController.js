const crypto = require("crypto");
const { getRazorpay } = require("../config/razorpay");
const Order = require("../models/Order");
const User = require("../models/User");
const PLANS = { starter: { credits: 15, amount: 9900 }, popular: { credits: 40, amount: 19900 }, pro: { credits: 110, amount: 49900 } };

exports.createOrder = async (req, res) => {
  try {
    const plan = PLANS[req.body.plan];
    if (!plan) return res.status(400).json({ error: "Invalid plan" });
    const order = await getRazorpay().orders.create({ amount: plan.amount, currency: "INR", receipt: `rcpt_${Date.now()}` });
    await Order.create({ userId: req.userId, razorpayOrderId: order.id, amount: plan.amount, credits: plan.credits });
    res.json({ orderId: order.id, amount: plan.amount, currency: "INR" });
  } catch { res.status(500).json({ error: "Failed" }); }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;
    const expected = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(`${razorpayOrderId}|${razorpayPaymentId}`).digest("hex");
    if (expected !== razorpaySignature) return res.status(400).json({ error: "Invalid signature" });
    const order = await Order.findOneAndUpdate({ razorpayOrderId, userId: req.userId }, { razorpayPaymentId, razorpaySignature, status: "paid" }, { new: true });
    if (!order) return res.status(404).json({ error: "Order not found" });
    const user = await User.findByIdAndUpdate(req.userId, { $inc: { credits: order.credits } }, { new: true });
    res.json({ success: true, credits: user.credits });
  } catch { res.status(500).json({ error: "Failed" }); }
};

exports.getBalance = async (req, res) => {
  try { const u = await User.findById(req.userId).select("credits plan"); res.json({ credits: u.credits, plan: u.plan }); }
  catch { res.status(500).json({ error: "Failed" }); }
};

const User = require("../models/User");
const Image = require("../models/Image");
exports.getProfile = async (req, res) => {
  try {
    const u = await User.findById(req.userId).select("-password");
    if (!u) return res.status(404).json({ error: "Not found" });
    res.json({ id: u._id, name: u.name, email: u.email, credits: u.credits, plan: u.plan });
  } catch { res.status(500).json({ error: "Failed" }); }
};
exports.updateProfile = async (req, res) => {
  try {
    const u = await User.findByIdAndUpdate(req.userId, { name: req.body.name }, { new: true });
    res.json({ id: u._id, name: u.name, email: u.email });
  } catch { res.status(500).json({ error: "Failed" }); }
};
exports.deleteAccount = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.userId);
    await Image.deleteMany({ userId: req.userId });
    res.json({ success: true });
  } catch { res.status(500).json({ error: "Failed" }); }
};

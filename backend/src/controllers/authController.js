const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User");
const tok = (id) => jwt.sign({ userId: id }, process.env.JWT_SECRET, { expiresIn: "30d" });
const fmt = (u) => ({ id: u._id, name: u.name, email: u.email, credits: u.credits, plan: u.plan });

exports.signup = async (req, res) => {
  try {
     console.log("Signup Hit");
    console.log("Signup Body:", req.body);
    const { name, email, password } = req.body;
    if (await User.findOne({ email })) return res.status(409).json({ error: "Email already registered" });
    const user = await User.create({ name, email, password: await bcrypt.hash(password, 10), credits: 5 });
    res.status(201).json({ token: tok(user._id), user: fmt(user) });
  } catch { res.status(500).json({ error: "Signup failed" }); }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user?.password || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ error: "Invalid email or password" });
    res.json({ token: tok(user._id), user: fmt(user) });
  } catch { res.status(500).json({ error: "Login failed" }); }
};

exports.googleLogin = async (req, res) => {
  try {
    const payload = (await new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
      .verifyIdToken({ idToken: req.body.idToken, audience: process.env.GOOGLE_CLIENT_ID })).getPayload();
    let user = await User.findOne({ email: payload.email });
    if (!user) user = await User.create({ name: payload.name, email: payload.email, googleId: payload.sub, credits: 5 });
    res.json({ token: tok(user._id), user: fmt(user) });
  } catch { res.status(401).json({ error: "Google login failed" }); }
};

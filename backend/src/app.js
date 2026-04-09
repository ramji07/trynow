const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { globalLimiter } = require("./middleware/rateLimiter");
const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

app.use((req, res, next) => {
  console.log("====== API REQUEST ======");
  console.log("Method:", req.method);
  console.log("URL:", req.originalUrl);
  console.log("Body:", req.body);
  console.log("=========================");
  next();
});
app.use(globalLimiter);
app.get("/api/healthz", (_req, res) => res.json({ status: "ok" }));
app.use("/api/auth",    require("./routes/auth"));
app.use("/api/user",    require("./routes/user"));
app.use("/api",         require("./routes/generate"));
app.use("/api/images",  require("./routes/images"));
app.use("/api/credits", require("./routes/credits"));
app.use((err, _req, res, _next) => { console.error(err); res.status(500).json({ error: "Internal server error" }); });
module.exports = app;

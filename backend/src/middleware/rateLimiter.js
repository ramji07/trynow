const rateLimit = require("express-rate-limit");
module.exports = {
  globalLimiter:   rateLimit({ windowMs: 15*60*1000, max: 100 }),
  authLimiter:     rateLimit({ windowMs: 15*60*1000, max: 10 }),
  generateLimiter: rateLimit({ windowMs: 60*1000, max: 5 }),
};

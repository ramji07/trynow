const { validationResult } = require("express-validator");
module.exports = function(req, res, next) {
  const e = validationResult(req);
  if (!e.isEmpty()) return res.status(400).json({ errors: e.array() });
  next();
};

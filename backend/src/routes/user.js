const { Router } = require("express");
const ctrl = require("../controllers/userController");
const auth = require("../middleware/auth");
const r = Router();
r.get("/profile",  auth, ctrl.getProfile);
r.put("/profile",  auth, ctrl.updateProfile);
r.delete("/account", auth, ctrl.deleteAccount);
module.exports = r;

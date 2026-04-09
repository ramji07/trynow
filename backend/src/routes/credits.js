const { Router } = require("express");
const ctrl = require("../controllers/creditsController");
const auth = require("../middleware/auth");
const r = Router();
r.get("/balance", auth, ctrl.getBalance);
r.post("/order",  auth, ctrl.createOrder);
r.post("/verify", auth, ctrl.verifyPayment);
module.exports = r;

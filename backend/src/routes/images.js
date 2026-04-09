const { Router } = require("express");
const { getImages, deleteImage } = require("../controllers/imageController");
const auth = require("../middleware/auth");
const r = Router();
r.get("/", auth, getImages);
r.delete("/:id", auth, deleteImage);
module.exports = r;

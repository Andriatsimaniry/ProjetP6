//Router sauces
const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require('../middleware/multer-config');

const fs = require("fs");

const sauceCtrl = require("../controllers/sauces");

router.get("/", auth, sauceCtrl.getAllSauces);
router.post("/", auth, multer, sauceCtrl.createSauces);
router.get("/:id", auth, sauceCtrl.getOneSauces);
router.put("/:id", auth, multer, sauceCtrl.modifySauces);
router.delete("/:id", auth, sauceCtrl.deleteSauces);
router.post('/:id/likes', auth, sauceCtrl.likes);//Likes et dislikes

module.exports = router;

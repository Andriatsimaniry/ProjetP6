//Router sauce

const express = require("express");
const router = express.Router();
// const Sauce = require("../models/sauce");
const fs = require("fs");

const sauceCtrl = require('../controllers/sauce');
router.get('/', sauceCtrl.getAllSauce);
router.post('/', sauceCtrl.createSauce);
router.get('/:id', sauceCtrl.getOneSauce);
router.put('/:id', sauceCtrl.modifySauce);
router.delete('/:id', sauceCtrl.deleteSauce);



module.exports = router;

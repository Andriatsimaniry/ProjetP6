const express = require("express");
const router = express.Router();
const Sauce = require("../models/sauce");

// POST:créer des objets
router.post("/", function (req, res, next) {
  delete req.body._id;
  Sauce.create(req.body, function (err, sauce) {
    if (err) {
      res.send(err);
    }
    res.json(sauce);
    next();
  });
});
//GET: /api/sauce
router.get("/", function (req, res, next) {
  Sauce.find(function (err, sauce) {
    if (err) {
      res.send(err);
    }
    res.json(sauce);
    next();
  });
});

// GET:/:id
router.get("/:id", function (req, res, next) {
  Sauce.findById(req.params.id, function (err, sauce) {
    if (err) {
      res.send(err);
    }
    res.json(sauce);
    next();
  });
});
// PUT: /:id
router.put("/:id", function (req, res, next) {
  Sauce.findByIdAndUpdate(req.params.id, req.body, function (err, sauce) {
    if (err) {
      res.send(err);
    }
    res.json("valeurs mis  a jour");
    next();
  });
});
// DELETE: /:id
router.delete("/:id", function (req, res) {
  Sauce.findByIdAndRemove(req.params.id, function (err, sauce) {
    if (err) {
      res.send(err);
    }
    res.json(sauce);
  });
});


module.exports = router;

const express = require("express");
const router = express.Router();
const Sauce = require("../models/sauce");

// POST:enregistrer des objets
router.post("/", (req, res, next) => {
  //delete req.body._id;
  const sauce = new Sauce({
    ...req.body,
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
});

//GET: récupérer des objets
router.get("/", (req, res, next) => {
  Sauce.find()
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(400).json({ error }));
});

// GET:/:id récupérer un seul objet
router.get("/:id", (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
});

// PUT: /:id mettre à jour un objet
router.put("/:id", (req, res, next) => {
  Sauce.findOneAndUpdate(
    { _id: req.params.id },
    { ...req.body, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) => res.status(400).json({ error }));
});

// DELETE: /:id supprimer un objet
router.delete("/:id", (req, res, next) => {
  Sauce.findOneAndDelete({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
});



module.exports = router;

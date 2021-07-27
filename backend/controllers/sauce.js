//Controlleurs /sauce.js
const Sauce = require("../models/sauce");
const fs = require("fs");
const { json } = require("body-parser");

// // POST:enregistrer des objets
 exports.createSauce = (req, res, next) => {
    const sauceObjet = JSON.parse(req.body.Sauce); 
    delete sauceObjet._id;
     const sauce = new Sauce({
       ...sauceObjet,
       imageUrl: `${req.protocol}://${req.get("host")}/images/${
         req.file.filename
     }`
     });
     sauce
       .save()
       .then(() => res.status(201).json({ message: "Objet enregistré !" }))
       .catch((error) => res.status(400).json({ error }));
};                                                               
                                                                        
// GET:/:id récupérer un seul objet
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

// PUT: /:id mettre à jour un objet
exports.modifySauce = (req, res, next) => {
    const sauceObjet = req.file
    ? {
        ...JSON.parse(req.body.Sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
    Sauce.findOneAndUpdate(
            { _id: req.params.id },
            { ...req.body, _id: req.params.id }
          )
            .then(() => res.status(200).json({ message: "Objet modifié !" }))
            .catch((error) => res.status(400).json({ error }));
        };


// DELETE: /:id supprimer un objet
exports.deleteSauce = (req, res, next) => {
  Sauce.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({ message: "Objet supprimé !" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};
//GET: récupérer des objets
exports.getAllSauce = (req, res, next) => {
  Sauce.find()
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

//Controlleurs /sauce.js
// const express = require("express");
const Sauces = require("../models/sauces");
const fs = require("fs");

// // POST: créer des sauces
exports.createSauces = (req, res, next) => {
  const sauceObjet = JSON.parse(req.body.sauces);
  delete sauceObjet._id;
  const sauces = new Sauces({
    ...sauceObjet,
    likes: 0,
    dislikes: 0,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  sauces
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

// GET:/:id récupérer une seule sauces
exports.getOneSauces = (req, res, next) => {
  Sauces.findOne({ _id: req.params.id })
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(404).json({ error }));
};

// PUT: /:id mettre à jour une sauces
exports.modifySauces = (req, res, next) => {
  const sauceObjet = req.file
    ? {
        ...JSON.parse(req.body.sauces),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Sauces.updateOne(
    { _id: req.params.id },
    { ...sauceObjet, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

// DELETE: /:id supprimer une sauces
exports.deleteSauces = (req, res, next) => {
  Sauces.findOne({ _id: req.params.id })
    .then((sauces) => {
      const filename = sauces.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Sauces.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Objet supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

//GET: récupérer toutes les sauces
exports.getAllSauces = (req, res, next) => {
  Sauces.find()
    .then((sauces) => {
      res.status(200).json(sauces);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

//Code j'aime , j'aime pas
exports.likes = (req, res, next) => {
  if (req.body.like === 1) {
    Sauces.updateOne(
      { _id: req.params.id },
      {
        $inc: { likes: req.body.like++ },
        $push: { usersLiked: req.body.userId },
      }
    )
      .then(() =>
        res.status(200).json({ message: "Like added for that sauce !" })
      )
      .catch((error) => res.status(400).json({ error }));
  } else if (req.body.like === -1) {
    Sauces.updateOne(
      { _id: req.params.id },
      {
        $inc: { dislikes: req.body.like++ * -1 },
        $push: { usersDisliked: req.body.userId },
      }
    )
      .then(() =>
        res.status(200).json({ message: "Dislike added for that sauce !" })
      )
      .catch((error) => res.status(400).json({ error }));
  } else {
    Sauces.findOne({ _id: req.params.id })
      .then((sauces) => {
        if (sauces.usersLiked.includes(req.body.userId)) {
          Sauces.updateOne(
            { _id: req.params.id },
            { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } }
          )
            .then(() =>
              res
                .status(200)
                .json({
                  message: "Your Like has been removed for that sauce !",
                })
            )
            .catch((error) => res.status(400).json({ error }));
        } else if (sauce.usersDisliked.includes(req.body.userId)) {
          Sauces.updateOne(
            { _id: req.params.id },
            {
              $pull: { usersDisliked: req.body.userId },
              $inc: { dislikes: -1 },
            }
          )
            .then(() =>
              res
                .status(200)
                .json({
                  message: "Your Dislike has been removed for that sauce !",
                })
            )
            .catch((error) => res.status(400).json({ error }));
        }
      })
      .catch((error) => res.status(400).json({ error }));
  }
};

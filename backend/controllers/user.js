const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const maskData = require("maskdata");

// Pour masquer l'email
const emailMask2Options = {
  maskWith: "*",
  unmaskedStartCharactersBeforeAt: 5,
  unmaskedEndCharactersAfterAt: 2,
  maskAtTheRate: false,
};

//Inscription Utilisateur
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: maskData.maskEmail2(req.body.email, emailMask2Options),
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "utilisateur crée !" }))
        .catch((error) => res.status(400).json({ message: error }));
    })
    .catch((error) => res.status(500).json({ message: error }));
};

// Connection Utilisateur
exports.login = (req, res, next) => {
  User.findOne({
    email: maskData.maskEmail2(req.body.email, emailMask2Options),
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ message: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ message: error }));
    })
    .catch((error) => res.status(500).json({ message: error }));
};

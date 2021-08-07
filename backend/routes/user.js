const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");

const { body, validationResult } = require("express-validator");

// Trouve les erreurs de validation d'un utilisateur et les envellopes dans des fonctions
const connect = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
//Valider l'email et le mot de passe de l-utilisateur avant d'enregistrer à la base de donnée
router.post(
  "/signup",
  [body("email").isEmail(), body("password").isLength({ min: 5 })],
  connect,
  userCtrl.signup
);
//Connecter l'utilisateur
router.post(
  "/login",
  [body("email").isEmail(), body("password").isLength({ min: 5 })],
  connect,
  userCtrl.login
);

module.exports = router;

//Appel des modules
const express = require("express"); //Importer express
const mongoose = require("mongoose");
const sauceRoutes = require("./routes/sauces");
const userRoutes = require("./routes/user");
const helmet = require("helmet");
const session = require("cookie-session");
const path = require("path");
const rateLimit = require("express-rate-limit");

// utilisation du module 'dotenv' pour masquer les informations de connexion à la base de données à l'aide de variables d'environnement
require("dotenv").config();

// Connection à la base de donnée
mongoose
  .connect(process.env.MD_UTIL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express(); //Pour créer une application express

//Résolution des Cors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

//  Pour proteger l'application contre les attaques
// content-Security-Policy,x-powered-by,Strict-Transport-Security,
// X-Download-Option,Cache-Control,Content-Type-Options,X-frame-Option,X-Xss-Protection
app.use(helmet());

// Protection pour eviter les vol de sessions
const expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 heure
app.use(
  session({
    name: "session",
    secret: process.env.CK_SES,
    cookie: {
      secure: true,
      httpOnly: true,
      domain: "http://localhost:3000",
      expires: expiryDate,
    },
  })
);

// Pour éviter les attaques de force brute
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limite chaque IP à 100 requêtes
});

//  S'applique à toutes les demandes
app.use(limiter);

// utiliser reponse json
app.use(express.json()); //Transformer le corps de la requette en objet javascript utilisable
app.use(express.urlencoded({ extended: true }));

//Appel de l'API

// Active le middleware de logging
app.use("/api/auth", userRoutes);

//indique que le dossier /images contient des images statiques
app.use("/images", express.static(path.join(__dirname, "images")));

// Répond toutes les sauces
app.use("/api/sauces", sauceRoutes);

module.exports = app; //Pour pouvoir acceder depuis des autres fichiers notament serveur Node

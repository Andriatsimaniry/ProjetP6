//Appel des modules 
const express = require("express");
const mongoose = require("mongoose");
const sauceRoutes = require("./routes/sauces");
const userRoutes = require("./routes/user");

const path = require("path");

// Connection à la base de donnée
mongoose
  .connect(
    // Connection MangoDb
   
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();

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

// utiliser reponse json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Appel de l'API
// Active le middleware de logging
app.use("/api/auth", userRoutes);
//indique que le dossier /images contient des images statiques
app.use("/images", express.static(path.join(__dirname, "images")));
// Répond toutes les sauces
app.use("/api/sauces", sauceRoutes);

module.exports = app;

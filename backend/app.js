//Appel des modules
const express = require("express"); //Importer express 
const mongoose = require("mongoose");
const sauceRoutes = require("./routes/sauces");
const userRoutes = require("./routes/user");
const helmet = require("helmet");

const path = require("path");

// Connection à la base de donnée
mongoose
  .connect(
    // Connection MangoDb
    "mongodb+srv://Omega:Noro1965@cluster0.ke0q7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
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

// utiliser reponse json
app.use(express.json());  //Transformer le corps de la requette en objet javascript utilisable
app.use(express.urlencoded({ extended: true }));


//Appel de l'API

// Active le middleware de logging
app.use("/api/auth", userRoutes);

//indique que le dossier /images contient des images statiques
app.use("/images", express.static(path.join(__dirname, "images")));

// Répond toutes les sauces
app.use("/api/sauces", sauceRoutes);

module.exports = app; //Pour pouvoir acceder depuis des autres fichiers notament serveur Node

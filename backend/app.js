//app.js
require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require('helmet');
const sauceRoutes = require("./routes/sauces");
const userRoutes = require("./routes/user");

const path = require("path");

// Connection à la base de donnée
mongoose
  .connect(
    // Connection MangoDb
    "mongodb+srv://Niry:Lova1999@cluster0.ke0q7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",

    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      // useFindAndModify: true,
    }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();
app.use(helmet());

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
  // res.setHeader("Access-Control-Allow-Credentials,true");
  next();
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Appel de l'API
app.use("/api/auth", userRoutes); // Active le middleware de logging
app.use("/images", express.static(path.join(__dirname, "images"))); //indique que le dossier /images contient des images statiques
app.use("/api/sauces", sauceRoutes); // Répond


module.exports = app;
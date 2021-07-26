const express = require("express");
const mongoose = require("mongoose");
const sauceRoutes = require("./routes/routesauce");
const app = express();
const userRoutes = require("./routes/user");

app.use("/api/sauce", sauceRoutes);
app.use("/api/auth", userRoutes);

mongoose
  .connect(
    "mongodb+srv://Niry:ando1994@cluster0.vzrwc.mongodb.net/test?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    "Access-Control-Allow-Credentials,false"
  );
  // const XMLHttpRequest : new
  // const xhr = new XMLHttpRequest();
  // xhr.open("GET", "http://localhost:4200/", true);
  // xhr.withCredentials = true;
  // xhr.send(null);
  // next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

module.exports = app;

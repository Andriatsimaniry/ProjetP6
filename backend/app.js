const express = require("express");
const mongoose = require("mongoose");
const Sauce = require("./models/sauce");

const app = express();

mongoose
  .connect(
    "mongodb+srv://Niry:ando1994@cluster0.vzrwc.mongodb.net/test?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
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
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//GET: /api/sauce
app.get("/api/sauce", function (req, res, next) {
  Sauce.find(function (err, sauce) {
    if (err) {
      res.send(err);
    }
    res.json(sauce);
    next();
  });
});
// POST:/api/sauce
app.post("/api/sauce", function (req, res, next) {
  delete req.body._id;
  Sauce.create(req.body, function (err, sauce) {
    if (err) {
      res.send(err);
    }
    res.json(sauce);
    next();
  });
});

// GET:/api/sauce/:id
app.get("/api/sauce/:id", function (req, res, next) {
  Sauce.findById(req.params.id, function (err, sauce) {
    if (err) {
      res.send(err);
    }
    res.json(sauce);
    next();
  });
});
// PUT: /api/sauce/:id
app.put("/api/sauce/:id", function (req, res, next) {
  Sauce.findByIdAndUpdate(req.params.id, req.body, function (err, sauce) {
    if (err) {
      res.send(err);
    }
    res.json('valeurs mis  a jour');
    next();
  });
});
// DELETE: /api/sauce/:id
app.delete("/api/sauce/:id", function (req, res) {
  Sauce.findByIdAndRemove(req.params.id, function (err, sauce) {
    if (err) {
      res.send(err);
    }
    res.json(sauce);
  });
});

module.exports = app;

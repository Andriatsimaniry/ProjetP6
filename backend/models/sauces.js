const mongoose = require("mongoose");

const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { String },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true },
  usersLiked: { type: [0], required: true },
  usersDisLiked: { type: [0], required: true },



  // "userId": "String",
  // "name":"String",
  // "manufacturer":"String",
  // "description": "String",
  // "mainPepper": "String",
  // "imageUrl":"String",
  // "heat": Number,
  // "likes": Number,
  // "dislikes": Number,
  // "usersLiked": [],
  // "usersDisLiked": []

});
  module.exports = mongoose.model("Sauces", sauceSchema);
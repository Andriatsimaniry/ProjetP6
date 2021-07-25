const mongoose = require("mongoose");

const sauceSchema = mongoose.Schema({
  userId: "",
  name: "",
  manufacturer: "",
  description: "",
  imageUrl: "",
  heat: 0,
  likes:0,
  dislikes: 0,
  usersLiked: [],
  usersDisLiked: [],
});

module.exports = mongoose.model("Sauce", sauceSchema);

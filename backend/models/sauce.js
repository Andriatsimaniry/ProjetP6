const mongoose = require("mongoose");

// Schema de données d'une sauce
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, required: true,default: 0  },
  dislikes: { type: Number, required: true, default: 0 },
  usersLiked: { type: [], required: true },
  usersDisliked: { type: [], required: true },

});
  module.exports = mongoose.model("Sauce", sauceSchema);
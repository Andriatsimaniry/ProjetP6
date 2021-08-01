const mongoose = require("mongoose");

const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { String },
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
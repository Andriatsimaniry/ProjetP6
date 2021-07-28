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
  usersLiked: { type: [], required: true },
  usersDisLiked: { type: [], required: true },
});
module.exports = mongoose.model("Sauce", sauceSchema);

// userId: "",
// name: "",
// manufacturer: "",
// description: "",
// imageUrl: "",
// heat: 0,
// likes:0,
// dislikes: 0,
// mainPepper:"",
// usersLiked: [],
// usersDisLiked: [],

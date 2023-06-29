const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true, min: 3 },
  password: { type: String, required: true, min: 3 },
  email: { type: String, required: true, min: 8 },
  id: { type: String, required: true, min: 3 },
  questionsId: { type: Array, required: false },
});

module.exports = mongoose.model("User", userSchema);       
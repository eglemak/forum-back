const mongoose = require("mongoose");

const answerSchema = mongoose.Schema({
  creationDate: { type: String, required: true },
  answerText: { type: String, required: true },
  gainedLikes: { type: Number, required: false },
  id: { type: String, required: true, min: 7 },
});

module.exports = mongoose.model("Answer", answerSchema);
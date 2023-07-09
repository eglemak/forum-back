const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
  questionText: { type: String, required: true, min: 3 },
  creationDate: { type: String, required: true },
  answersId: { type: Array, required: true },
  id: { type: String, required: true, min: 7 },
});

module.exports = mongoose.model("Question", questionSchema);
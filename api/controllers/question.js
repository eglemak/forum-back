const uniqid = require("uniqid");
const questionModel = require("../models/question");
const userModel = require("../models/user");

module.exports.INSERT_QUESTION = async (req, res) => {
  try {
    const question = new questionModel({
      questionText: req.body.questionText,
      creationDate: new Date(),
      answersId: [],
      id: uniqid(),
    });

    const createdQuestion = await question.save();

    userModel.updateOne(
      { id: req.body.userId },
      { $push: { questionsId: createdQuestion.id } }
    ).exec();

    return res.status(200).json({ response: "Question was created" });
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({ response: "ERROR" });
  }
};

module.exports.GET_ALL_QUESTIONS = async (req, res) => {
  const question = await questionModel.find();

  res.status(200).json({ question: question });
};

module.exports.DELETE_QUESTION_BY_ID = async (req, res) => {
  const question = await questionModel.findOneAndDelete({ id: req.params.id });

  res
    .status(200)
    .json({ response: "Question was deleted successfully", question: question });
};

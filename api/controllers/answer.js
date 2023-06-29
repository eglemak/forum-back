const answerModel = require("../models/answer");
const questionModel = require("../models/question");
const uniqid = require("uniqid");

module.exports.INSERT_ANSWER = async (req, res) => {
  const answer = new answerModel({
    id: uniqid(),
    creationDate: new Date(),
    answerText: req.body.answerText,
  });

  const savedAnswer = await answer.save();

  questionModel.updateOne(
    { id: req.params.id },
    { $push: { answersId: savedAnswer.id } }
  ).exec();

  res.status(200).json({ response: savedAnswer });
};

module.exports.DELETE_ANSWER = async (req, res) => {
  await answerModel.deleteOne({ id: req.params.id });
  res.status(200).json({ response: "Answer was deleted" });
};

module.exports.GET_ANSWERS_BY_QUESTION_ID = async (req, res) => {
  const aggregatedQuestionData = await questionModel.aggregate([
    {
      $lookup: {
        from: "answers",
        localField: "answersId",
        foreignField: "id",
        as: "question_answers",
      },
    },
    { $match: { id: req.params.id } },
  ]).exec();

  res.status(200).json({ response: aggregatedQuestionData });
};

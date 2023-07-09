const answerModel = require("../models/answer");
const questionModel = require("../models/question");
const uniqid = require("uniqid");

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

module.exports.INSERT_ANSWER = async (req, res) => {
  const answer = new answerModel({
    id: uniqid(),
    creationDate: formatDate(new Date()),
    answerText: req.body.answerText,
    gainedLikes: 0,
  });

  const savedAnswer = await answer.save();

  questionModel.updateOne(
    { id: req.params.id },
    { $push: { answersId: savedAnswer.id } }
  ).exec();

  res.status(200).json({ response: savedAnswer });
};

module.exports.DELETE_ANSWER = async (req, res) => {
  await answerModel.deleteOne({ id: req.params.answerId });
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

  res.status(200).json({ response: aggregatedQuestionData[0] });
};

module.exports.UPDATE_LIKES = async (req, res) => {
    console.log(req.params.answerId);
    const answer = await answerModel.findOne({ id: req.params.answerId });
    console.log(answer);
    let oldLikes = 0;
    if (answer.gainedLikes) {
        oldLikes = answer.gainedLikes;
    } 
    const receivedLike = req.body.gainedLikes;
    const newGainedLikes = oldLikes + receivedLike;
    
    await answerModel.updateOne(
        { id: req.params.answerId },
        { gainedLikes: newGainedLikes }
    );
    res.status(200).json({ response: "Answer was updated" });
  };
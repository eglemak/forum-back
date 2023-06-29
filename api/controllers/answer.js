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


// module.exports.GET_SUMMARIES_BY_GROUP_ID = async (req, res) => {
//   const aggregatedGroupData = await GroupModel.aggregate([
//     {
//       $lookup: {
//         from: "summaries",
//         localField: "summaryCardIds",
//         foreignField: "id",
//         as: "group_summaries",
//       },
//     },
//     { $match: { id: req.params.groupId } },
//   ]).exec();

//   res.status(200).json({ response: aggregatedGroupData });
// };

// module.exports.GET_SUMMARY_CARD_BY_ID = async (req, res) => {
//   const summary = await SummaryModel.find({ id: req.params.id });
//   res.status(200).json({ response: summary });
// };




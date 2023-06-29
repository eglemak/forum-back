const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const {
  INSERT_ANSWER,
  DELETE_ANSWER,
  GET_ANSWERS_BY_QUESTION_ID,
  UPDATE_LIKES,
} = require("../controllers/answer");

router.post("/question/:id/answer", authMiddleware, INSERT_ANSWER);
router.delete("/answer/:id", authMiddleware, DELETE_ANSWER);
router.get("/question/:id/answers", GET_ANSWERS_BY_QUESTION_ID);
router.put("/question/:id/answer/:answerId", authMiddleware, UPDATE_LIKES);

module.exports = router;

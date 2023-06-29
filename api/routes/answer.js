const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const {
  INSERT_ANSWER,
  DELETE_ANSWER,
  GET_ANSWERS_BY_QUESTION_ID,
} = require("../controllers/answer");

router.post("/question/:id/answer", authMiddleware, INSERT_ANSWER);
router.delete("/answer/:id", authMiddleware, DELETE_ANSWER);
router.get("/question/:id/answers", GET_ANSWERS_BY_QUESTION_ID);

module.exports = router;

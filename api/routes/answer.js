const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const {
  INSERT_ANSWER,
  DELETE_ANSWER,
  // GET_SUMMARY_CARD_BY_ID,
  // GET_SUMMARIES_BY_GROUP_ID,
  // UPDATE_SUMMARY_CONTENT,
  // UPDATE_SUMMARY_TITLE,
  // DELETE_SUMMARY_CARD,
} = require("../controllers/answer");

// router.post("/summary", authMiddleware, INSERT_SUMMARY_CARD);
router.post("/question/:id/answer", authMiddleware, INSERT_ANSWER);
router.delete("/answer/:id", authMiddleware, DELETE_ANSWER);
// router.get("/summary/:id", authMiddleware, GET_SUMMARY_CARD_BY_ID);
// router.get("/summaries/:groupId", authMiddleware, GET_SUMMARIES_BY_GROUP_ID);
// router.put("/summary/title/:id", authMiddleware, UPDATE_SUMMARY_TITLE);
// router.put("/summary/content/:id", authMiddleware, UPDATE_SUMMARY_CONTENT);


module.exports = router;

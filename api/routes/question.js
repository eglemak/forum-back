const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const {
//   INSERT_GROUP,
//   GET_ALL_GROUPS,
//   GET_GROUP_BY_ID,
//   DELETE_GROUP_BY_ID,
    INSERT_QUESTION
} = require("../controllers/question");

router.post("/question", authMiddleware, INSERT_QUESTION);
// // router.get("/groups", authMiddleware, GET_ALL_GROUPS);
// router.get("/group/:id", authMiddleware, GET_GROUP_BY_ID);
// router.delete("/group/:id", authMiddleware, DELETE_GROUP_BY_ID);

module.exports = router;

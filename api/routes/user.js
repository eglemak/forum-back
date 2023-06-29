const express = require("express");
const router = express.Router();
// const authMiddleware = require("../middleware/auth");
const {
    SIGN_UP,
    LOGIN,
//   GET_ALL_GROUPS_BY_USER_ID,
} = require("../controllers/user");

router.post("/user", SIGN_UP);
router.post("/logIn", LOGIN);
// router.get("/groups/:userId", authMiddleware, GET_ALL_GROUPS_BY_USER_ID);

module.exports = router;
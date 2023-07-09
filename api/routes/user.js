const express = require("express");
const router = express.Router();
const {
    SIGN_UP,
    LOGIN,
} = require("../controllers/user");

router.post("/user", SIGN_UP);
router.post("/logIn", LOGIN);

module.exports = router;
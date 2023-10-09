const express = require("express");
const { registerUser, signInUser } = require("../users/controller");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/signin").post(signInUser);

module.exports = router;

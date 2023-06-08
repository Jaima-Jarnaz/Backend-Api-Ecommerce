const express = require("express");
const { registerUser } = require("../users/controller");
const router = express.Router();

router.route("/register").post(registerUser);

module.exports = router;

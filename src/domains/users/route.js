const express = require("express");
const {
  registerUser,
  signInUser,
  signOut,
  hello,
} = require("../users/controller");
const { auth } = require("../../middleware/auth");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/signin").post(signInUser);
router.route("/signout").post(signOut);
router.route("/hello").get(auth, hello);

module.exports = router;

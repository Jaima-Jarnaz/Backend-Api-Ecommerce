const express = require("express");
const { subscribe, unsubscribe } = require("./controller");

const router = express.Router();

router.route("/subscribe").post(subscribe);
router.route("/unsubscribe/:token").get(unsubscribe);

module.exports = router;

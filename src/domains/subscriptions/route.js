const express = require("express");
const { subscribe, unsubscribe } = require("./controller");
const { getCampaignStatus } = require("./campaignController");

const router = express.Router();

router.route("/subscribe").post(subscribe);
router.route("/unsubscribe/:token").get(unsubscribe);
router.route("/campaign/:id").get(getCampaignStatus);

module.exports = router;

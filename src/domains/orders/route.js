const express = require("express");
const {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrderDetails,
  deleteOrder,
} = require("./controller");
//const authenticateUser = require("../middleware/auth");
const router = express.Router();

router.route("/all").get(getAllOrders);
router.route("/create").post(createOrder);
router.route("/:id").get(getSingleOrder);
router.route("/update/:id").put(updateOrderDetails);
router.route("/delete/:id").delete(deleteOrder);

module.exports = router;

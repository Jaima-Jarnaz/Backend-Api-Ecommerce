const express = require("express");
const {
  createProducts,
  getAllProducts,
  getSingleProduct,
  updateProducts,
  deleteProduct,
  promoCodeValidate,
} = require("./controller");
//const authenticateUser = require("../middleware/auth");
const router = express.Router();

router.route("/all").get(getAllProducts);
router.route("/new").post(createProducts);
router.route("/:id").get(getSingleProduct);
router.route("/update/:id").put(updateProducts);
router.route("/delete/:id").delete(deleteProduct);
router.route("/discount").post(promoCodeValidate);

module.exports = router;

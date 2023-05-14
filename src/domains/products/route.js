const express = require("express");
const {
  createProducts,
  getAllProducts,

} = require("./controller");
//const authenticateUser = require("../middleware/auth");
const router = new express.Router();

router.route("").get(getAllProducts);
//router.route("/:id").get(getSingleProduct);
router.route("/new").post(createProducts);
//router.route("/update/:id").put(updateProducts);
//router.route("/delete/:id").delete(deleteProduct);

module.exports = router;
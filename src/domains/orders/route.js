const express = require("express");
const {
  createOrder,
  //   getAllProducts,
  //   getSingleProduct,
  //   updateProducts,
  //   deleteProduct
} = require("./controller");
//const authenticateUser = require("../middleware/auth");
const router = express.Router();

// router.route("/all").get(getAllProducts);
router.route("/create").post(createOrder);
// router.route("/:id").get(getSingleProduct);
// router.route("/update/:id").put(updateProducts);
// router.route("/delete/:id").delete(deleteProduct);

module.exports = router;

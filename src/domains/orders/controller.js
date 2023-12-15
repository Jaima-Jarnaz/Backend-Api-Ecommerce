const Order = require("./model");
const CustomErrorHandler = require("../../utils/customErrorHandler");

const createOrder = async (req, res, next) => {
  try {
    const { deliveryAddress } = req.body;
    const orderData = new Order(req.body);
    console.log(deliveryAddress);
    await orderData.save().catch((error) => {
      console.error(error);
    });
    res.status(201).json({
      success: true,
      message: "Successfully order data created !!!",
      data: orderData,
    });

    if (!orderData) {
      return next(new CustomErrorHandler("Sorry,invalid operation!!!!!!", 404));
    }
  } catch (error) {
    res.status(500).send({
      message: "Sorry!!!Server Error!!!!!!!!!!",
      error: error,
    });
  }
};

module.exports = {
  createOrder,
};

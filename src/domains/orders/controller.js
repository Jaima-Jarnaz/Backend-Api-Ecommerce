const Order = require("./model");
const CustomErrorHandler = require("../../utils/customErrorHandler");

//------------API for create orders-----------------
const createOrder = async (req, res, next) => {
  try {
    const orderData = new Order(req.body);
    await orderData.save().catch((error) => {
      console.error(error);
    });
    res.status(201).json({
      success: true,
      message: "Successfully order data created !!!",
      data: orderData,
    });

    if (!orderData) {
      return next(CustomErrorHandler("Sorry,invalid operation!!!!!!", 404));
    }
  } catch (error) {
    res.status(500).send({
      message: "Sorry!!!Server Error!!!!!!!!!!",
      error: error,
    });
  }
};

//------------API for get all orders----------------
const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();

    if (!orders) {
      return next(CustomErrorHandler("No orders available!!!", 404));
    }

    res.status(201).send({
      message: "Orders found successfully",
      orders,
    });
  } catch (error) {
    res.status(500).send({
      message: "Sorry!!!Server Error!!!!!!!!!!",
      error: error,
    });
  }
};

//------------API for get all orders----------------
const getSingleOrder = async (req, res, next) => {
  try {
    const orders = await Order.findById(req.params.id);

    if (!orders) {
      return next(CustomErrorHandler("No orders available!!!", 404));
    }

    res.status(201).send({
      message: "Order found successfully",
      orders,
    });
  } catch (error) {
    res.status(500).send({
      message: "Sorry!!!Server Error!!!!!!!!!!",
      error: error,
    });
  }
};

//------------API for update order----------------
const updateOrderDetails = async (req, res, next) => {
  try {
    const existingOrder = await Order.findById(req.params.id);

    if (!existingOrder) {
      return next(CustomErrorHandler("No orders available!!!", 404));
    }

    const updatedData = {
      deliveryPlace: {
        address:
          req.body.deliveryPlace.address || existingOrder.deliveryPlace.address,
        division:
          req.body.deliveryPlace.division ||
          existingOrder.deliveryPlace.division,
        city: req.body.deliveryPlace.city || existingOrder.deliveryPlace.city,
      },
    };
    console.log(updatedData);

    const orders = await Order.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!orders) {
      return next(CustomErrorHandler("Sorry there is some error!!!", 404));
    }

    res.status(201).send({
      message: "Order data updated successfully",
      orders,
    });
  } catch (error) {
    res.status(500).send({
      message: "Sorry!!! Server Error",
      error: error,
    });
  }
};

//------------API for delete order----------------
const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return next(CustomErrorHandler("No orders available!!!", 404));
    }

    res.status(201).send({
      message: "Order deleted .....",
      order,
    });
  } catch (error) {
    res.status(500).send({
      message: "Sorry!!!Server Error!!!!!!!!!!",
      error: error,
    });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrderDetails,
  deleteOrder,
};

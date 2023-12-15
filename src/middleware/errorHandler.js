const CustomErrorHandler = require("../utils/customErrorHandler");

module.exports = (err, req, res, next) => {
  err.message = err.message || "Sorry!!Internal Server Error";
  err.statusCode = err.statusCode || 500;

  //mongodb id error and CastError: Cast to number failed for value "20000" (type string) at path "price" for model "Product"
  //this type error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid ${err.path} and ${err}`;
    err = new CustomErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    status: err.statusCode,
    error: err.stack,
  });
};

const Product = require("./model");
const cloudinary = require("../../config/cloudinary");

//const ErrorHandlerClass = require("../utils/errorHandlerClass");
//const catchAsyncError = require("../middleware/catchAsyncError");
//const ApiFeatures = require("../utils/apiFeatures");

// API for product create for Admin
const createProducts = async (req, res, next) => {
  try {
    const { name, price, description, color, imageUrl } = req.body;

    // Upload image into cloudinary

    const result = await cloudinary.uploader.upload(imageUrl);
    // result
    //   .then((data) => {
    //     console.log("data from image cloud", data);
    //     console.log("secure_url", result.secure_url);
    //   })
    //   .catch((er) => {
    //     console.log("From cloudinary ", er);
    //   });
    console.log("result", result);

    const product = new Product({
      name,
      description,
      price,
      color,
      image: {
        id: result.public_id,
        url: result.secure_url,
      },
    });
    await product.save();
    res.status(201).json({
      success: true,
      message: "Successfully product created !!!",
      data: product,
    });

    // if (!product) {
    //   return next(new ErrorHandlerClass("Sorry,invalid operation!!!!!!", 404));
    // }
  } catch (error) {
    res.status(500).send({
      message: "Sorry!!!Server Error!!!!!!!!!!",
      error: error,
    });
  }
};

// Get all Product,product  search,filter
// exports.getAllProducts = catchAsyncError(async (req, res, next) => {
//     const resultPerPage = 5;

//     const apiFeatures = new ApiFeatures(Product.find(), req.query)
//       .search()
//       .filter()
//       .pagination(resultPerPage);

//     const products = await apiFeatures.query;

//     const productCount = await Product.countDocuments();

//     if (!products) {
//       return next(new ErrorHandlerClass("Sorry no products available!!!", 404));
//     }
//     res.status(200).json({
//       status: true,
//       message: "Succesfully found all products",
//       tottalProduct: productCount,
//       productList: products,
//     });
//   });

//API for get all products
const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(201).send({
      message: "Products found successfully",
      products,
    });
  } catch (error) {
    res.status(500).send({
      message: "Sorry!!!Server Error!!!!!!!!!!",
      error: error,
    });
  }
};

// API For get single product
const getSingleProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    // if (!product) {
    //   return next(new ErrorHandlerClass("Product not found!!!!", 404));
    // }
    res.status(200).json({
      success: true,
      message: "Successfully found product details!!!",
      product: product,
    });
  } catch (error) {
    res.status(500).send({
      message: "Sorry!!!Server Error!!!!!!!!!!",
      error: error,
    });
  }
};

//Update product data---------------

const updateProducts = async (req, res, next) => {
  try {
    const productUpdated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    // if (!productUpdated) {
    //   return next(
    //     new ErrorHandlerClass("Failed to update the product... Not found!!!", 404)
    //   );
    // }
    res.send({
      success: true,
      message: "Successfully update product data !!!",
      data: productUpdated,
    });
  } catch (error) {
    res.status(500).send({
      message: "Sorry!!!Server Error!!!!!!!!!!",
      error: error,
    });
  }
};

//API for delete specific product data

const deleteProduct = async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  // if (!product) {
  //   return next(new ErrorHandlerClass("Product not found!!!!", 404));
  // }
  res.status(200).json({
    success: true,
    message: "Successfully product deleted!!!",
    product: product,
  });
};

module.exports = {
  getAllProducts,
  createProducts,
  getSingleProduct,
  deleteProduct,
  updateProducts,
};

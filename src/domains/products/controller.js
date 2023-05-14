const Product = require("./model");
//const ErrorHandlerClass = require("../utils/errorHandlerClass");
//const catchAsyncError = require("../middleware/catchAsyncError");
//const ApiFeatures = require("../utils/apiFeatures");


// Product create for Admin
const createProducts = async (req, res, next) => {
  try {
    const product = new Product(req.body);
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

//get all products
const getAllProducts = async (req, res,next) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (err) {
      console.log(err);
    }
  };
  module.exports={
    getAllProducts,
    createProducts
  }

  
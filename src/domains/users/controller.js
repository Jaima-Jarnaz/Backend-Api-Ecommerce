const jwt = require("jsonwebtoken");
const User = require("./model");
const {
  UNREGISTERED_USER,
  AUTHENTICATION_FAILED,
  USER_NOT_FOUND,
  PASSWORD_NOT_MATCHING,
  STATUS_CODE_404,
  STATUS_CODE_401,
} = require("../../helpers/constants");

const ErrorHandlerClass = require("../../utils/errorHandlerClass");

// API for register user
const registerUser = async (req, res, next) => {
  try {
    const { name, email, phone, password, confirmPassword } = req.body;

    //Checking password matching with confirm password
    if (req.body.password !== req.body.confirmPassword) {
      return next(
        new ErrorHandlerClass(PASSWORD_NOT_MATCHING, STATUS_CODE_401)
      );
    }

    // Create a JWT token
    const token = jwt.sign({ email }, `${process.env.TOKEN_SECRET}`, {
      expiresIn: "1h", // You can set the expiration time as needed
    });

    // Create a new user document and save the token
    const user = new User({
      name,
      email,
      phone,
      password,
      confirmPassword,
      token,
    });

    await user.save();

    if (!user) {
      return next(new ErrorHandlerClass(UNREGISTERED_USER, STATUS_CODE_404));
    }

    res.status(201).json({
      success: true,
      message: "User registered Successfully",
      data: { name, phone, email, token },
    });
  } catch (errors) {
    res.status(500).json({
      success: false,
      message: "Sorry!Something went wrong.Please try again",
      errors,
    });
  }
};

//API for signIn user
const signInUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email: email });
    const userData = {
      email: user.email,
      phone: user.phone,
      token: user.token,
    };

    if (!user) {
      // User not found
      return next(new ErrorHandlerClass(USER_NOT_FOUND, STATUS_CODE_404));
    }

    // Use the comparePassword method to check if the passwords match
    user.comparePassword(password, function (err, isMatch) {
      if (err) {
        return next(err); // Handle the error
      }

      if (isMatch) {
        // Passwords match, authentication successful
        res.status(201).json({
          success: true,
          message: "User authentication done successfully",
          data: userData,
        });
      } else {
        // Passwords don't match, authentication failed
        return next(
          new ErrorHandlerClass(AUTHENTICATION_FAILED, STATUS_CODE_401)
        );
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Sorry! Something went wrong. Please try again.",
      error: error,
    });
  }
};

module.exports = {
  registerUser,
  signInUser,
};

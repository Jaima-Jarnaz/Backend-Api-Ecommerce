const jwt = require("jsonwebtoken");
const User = require("./model");
const {
  REGISTERED_USER,
  AUTHENTICATION_FAILED,
  USER_NOT_FOUND,
  PASSWORD_NOT_MATCHING,
  STATUS_CODE_404,
  STATUS_CODE_401,
  STATUS_CODE_409,
  SERVER_ERROR,
  USER_REGISTERED_SUCCESSFULLY,
  USER_AUTH_DONE_SUCCESSFULLY,
} = require("../../helpers/constants");

const ErrorHandlerClass = require("../../utils/errorHandlerClass");

// API for register user
const registerUser = async (req, res, next) => {
  try {
    const { name, email, phone, password, confirmPassword } = req.body;

    //Checking user already registered or not
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return next(new ErrorHandlerClass(REGISTERED_USER, STATUS_CODE_409));
    }

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

    res.status(201).json({
      success: true,
      message: USER_REGISTERED_SUCCESSFULLY,
      data: { name, phone, email, token },
    });
  } catch (errors) {
    res.status(500).json({
      success: false,
      message: SERVER_ERROR,
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

    if (!user) {
      // User not found
      return next(new ErrorHandlerClass(USER_NOT_FOUND, STATUS_CODE_404));
    }

    const userData = {
      name: user.name,
      email: user.email,
      phone: user.phone,
      token: user.token,
    };

    // Use the comparePassword method to check if the passwords match
    await user.comparePassword(password, function (err, isMatch) {
      if (err) {
        return next(err); // Handle the error
      }

      if (isMatch) {
        res.status(201).json({
          success: true,
          message: USER_AUTH_DONE_SUCCESSFULLY,
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
      message: SERVER_ERROR,
      error: error,
    });
  }
};

const signOut = (req, res, next) => {
  res.clearCookie("token");
  res.send("Logged out successfully.");
};

// Route handler
const hello = (req, res) => {
  // Your registration logic goes here
  res.send("User registered successfully!");
};

module.exports = {
  registerUser,
  signInUser,
  signOut,
  hello,
};

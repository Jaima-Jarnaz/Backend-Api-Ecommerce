const User = require("./model");
const {
  UNREGISTERED_USER,
  INCORRECT_PASSWORD,
  PASSWORD_NOT_MATCHING,
  STATUS_CODE_404,
  STATUS_CODE_401,
} = require("../../helpers/constants");

const ErrorHandlerClass = require("../../utils/errorHandlerClass");

// API for register user
const registerUser = async (req, res, next) => {
  try {
    const user = new User(req.body);

    //Checking password matching with confirm password
    if (req.body.password !== req.body.confirmPassword) {
      return next(
        new ErrorHandlerClass(PASSWORD_NOT_MATCHING, STATUS_CODE_401)
      );
    }
    const { name, phone, email } = await user.save();

    if (!user) {
      return next(new ErrorHandlerClass(UNREGISTERED_USER, STATUS_CODE_404));
    }

    res.status(201).json({
      success: true,
      message: "User registered Successfully",
      data: { name, phone, email },
    });
  } catch (error) {
    res.status(500).json({
      message: "Sorry!Something went wrong.Please try again",
      error: error,
    });
  }
};

//API for signIn user

const signInUser = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);

  User.find({ email, password })
    .then((user) => {
      if (user) {
        // User found, do something
        console.log("User found:", user);
      } else {
        // User not found or incorrect credentials
        console.log("Invalid credentials");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

module.exports = {
  registerUser,
  signInUser,
};

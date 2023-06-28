const User = require("./model");

// API for register user
const registerUser = async (req, res, next) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({
      success: true,
      message: "Successfully registered",
      data: user,
    });
  } catch (error) {
    res.status(403).send({
      message: "Sorry!Something went wrong.Please try again",
      error: error,
    });
  }
};

module.exports = {
  registerUser,
};

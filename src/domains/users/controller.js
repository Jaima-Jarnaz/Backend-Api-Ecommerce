// API for register user
const registerUser = async (req, res, next) => {
  try {
    const user = new Product(req.body);
    await user.save();
    res.status(201).json({
      success: true,
      message: "Sorry !!!",
      data: user,
    });
  } catch (error) {
    res.status(403).send({
      message: "Sorry!!!Email already exist",
      error: error,
    });
  }
};

const User = require("../domains/users/model");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  //Checking if the token is valid
  let token = req.cookies.token;
  const verifyUser = jwt.verify(token, process.env.TOKEN_SECRET);

  const user = await User.findOne({ email: verifyUser.email });
  if (!user)
    return res.json({
      message: "Invalid Token",
      isAuth: false,
      error: true,
    });
  next();
};
module.exports = { auth };

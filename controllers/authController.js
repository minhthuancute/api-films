const catchAsync = require("../middlewares/catchAsync");
const User = require("../models/User");
const ApiError = require("../utils/ApiError");
const jwt = require("jsonwebtoken");

exports.login = catchAsync(async (req, res) => {
  const { password } = req.body;
  const user = await User.findOne({ password });
  if (user) {
    const token = jwt.sign(
      {
        password: user.password,
      },
      "toithatsungungokkk",
      {
        expiresIn: 6000000,
      }
    );
    res.status(200).json({
      success: true,
      data: {
        ...user._doc,
        token,
      },
    });
  } else {
    throw new ApiError(404, "User not found!");
  }
});

exports.register = catchAsync(async (req, res) => {
  const { fullname, password, teamName } = req.body;

  const user = await User.create({
    fullname,
    password,
    teamName,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.getProfile = catchAsync(async (req, res) => {
  const headerToken = req.headers.authorization;

  if (!headerToken) {
    throw new ApiError(401, "Unauthorized");
  }
  const token = headerToken.split(" ")[1];
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    const currentUser = await User.findOne({
      email: user.email,
    });
    res.status(200).json({
      success: true,
      data: currentUser,
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new ApiError(401, "Token is expried");
    }
    throw new ApiError(401, "Unauthorized");
  }
});

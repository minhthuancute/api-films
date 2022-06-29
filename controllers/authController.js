const catchAsync = require("../middlewares/catchAsync");
const User = require("../models/User");
const ApiError = require("../utils/ApiError");
const jwt = require("jsonwebtoken");
const ClockIn = require("../models/ClockIn");
const ClockOut = require("../models/ClockOut");

exports.login = catchAsync(async (req, res) => {
  const { password } = req.body;
  const user = await User.findOne({ password });
  if (user) {
    const token = jwt.sign(
      {
        password: user.password,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: 600000,
      }
    );
    res.status(200).json({
      success: true,
      data: {
        token,
        ...user._doc,
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
  console.log(headerToken);
  if (!headerToken) {
    throw new ApiError(401, "Unauthorized");
  }
  const token = headerToken.split(" ")[1];
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    const currentUser = await User.findOne({
      password: user.password,
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

exports.clockIn = catchAsync(async (req, res) => {
  const { user, timeStamps, imgUrl } = req.body;

  try {
    const clockIn = await ClockIn.create({
      user,
      timeStamps,
      imgUrl,
    });
    res.status(200).json({
      success: true,
      clockIn,
    });
  } catch (error) {}
});

exports.clockOut = catchAsync(async (req, res) => {
  const { user, timeStamps, imgUrl } = req.body;

  try {
    const clockOut = await ClockOut.create({
      user,
      timeStamps,
      imgUrl,
    });
    res.status(200).json({
      success: true,
      clockOut,
    });
  } catch (error) {}
});

exports.getListClockout = catchAsync(async (req, res) => {
  const { id } = req.query;
  const clockouts = await ClockOut.find({
    user: id,
  }).populate("user");

  res.status(200).json({
    success: true,
    data: clockouts,
  });
});

exports.getListClockIn = catchAsync(async (req, res) => {
  const { id } = req.query;
  const clockins = await ClockIn.find({
    user: id,
  }).populate("user");

  res.status(200).json({
    success: true,
    data: clockins,
  });
});

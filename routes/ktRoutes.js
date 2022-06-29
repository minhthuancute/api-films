const express = require("express");
const {
  login,
  register,
  getProfile,
  clockIn,
  clockOut,
  getListClockout,
  getListClockIn,
  getTimeSheets,
} = require("../controllers/authController");

const route = express.Router();

route.post("/login", login);
route.post("/register", register);
route.get("/me", getProfile);
route.post("/clockin", clockIn);
route.post("/clockout", clockOut);

route.get("/time-sheets", getTimeSheets);

route.get("/listClockout", getListClockout);
route.get("/listClockin", getListClockIn);

module.exports = route;

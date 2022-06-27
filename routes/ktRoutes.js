const express = require("express");
const {
  login,
  register,
  getProfile,
} = require("../controllers/authController");

const route = express.Router();

route.post("/login", login);
route.post("/register", register);
route.get("/me", getProfile);

module.exports = route;

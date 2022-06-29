const mongoose = require("mongoose");

const ClockInSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  timeStamps: String,
  imgUrl: String,
});

module.exports = mongoose.model("CLockin", ClockInSchema);

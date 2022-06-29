const mongoose = require("mongoose");

const ClockOutSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  timeStamps: String,
  imgUrl: String,
});

module.exports = mongoose.model("CLockOut", ClockOutSchema);

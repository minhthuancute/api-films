const mongoose = require("mongoose");
const { stringify } = require("uuid");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    fullname: {
      type: String,
      required: [true, "Fullname is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 4,
      maxlength: 4,
      unique: true,
    },
    teamName: {
      type: String,
      required: [true, "Team name is required"],
    },
    timeSheets: [
      {
        timeClockin: String,
        timeClockout: String,
        imgClockin: String,
        imgClockout: String,
      },
    ],
  },
  {
    timestamps: true,
    collection: "peter-users",
  }
);

module.exports = mongoose.model("User", UserSchema);

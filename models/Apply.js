const mongoose = require("mongoose");
const validator = require("validator");

const { ObjectId } = mongoose.Schema.Types;

const applySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    contactNumber: {
      type: String,
      required: true,
      validate: [
        validator.isMobilePhone,
        "please provide a valid contact number",
      ],
    },
    reasumeLink: {
      type: String,
      validate: [validator.isURL, "Please provide a valid url"],
      required: true,
    },
    job: {
      id: {
        type: ObjectId,
        ref: "User",
        required: true,
      },
    },
  },
  { timestamps: true }
);

const Apply = mongoose.model("Apply", applySchema);

module.exports = Apply;

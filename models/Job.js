const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const jobSchema = mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, "company name is required"],
    },
    title: {
      type: String,
      trim: true,
      maxLength: 100,
      lowercase: true,
      required: [true, "title is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    skills: {
      type: [String],
      required: [true, "skills is required"],
    },
    location: {
      type: String,
      enum: ["onsite", "remote"],
    },
    type: {
      type: String,
    },
    salary: {
      type: Number,
      required: true,
      min: [0, "salary can't be negative"],
    },
    manager: {
      name: {
        type: String,
        required: true,
      },
      id: {
        type: ObjectId,
        ref: "User",
        required: true,
      },
    },
    applys: [
      {
        type: ObjectId,
        ref: "Apply",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;

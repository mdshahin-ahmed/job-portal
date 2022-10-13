const mongoose = require("mongoose");

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
    salary: {
      type: Number,
      required: true,
      min: [0, "salary can't be negative"],
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;

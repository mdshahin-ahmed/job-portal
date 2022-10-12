const mongoose = require("mongoose");

const jobSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      maxLength: 100,
      lowercase: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    skills: {
      type: [String],
      required: true,
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

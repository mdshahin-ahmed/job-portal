const Job = require("../models/Job");

exports.createBrandService = async (data) => {
  const result = await Job.create(data);
  return result;
};

exports.getJobService = async () => {
  const result = await Job.find({});
  return result;
};

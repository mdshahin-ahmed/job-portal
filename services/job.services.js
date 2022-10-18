const Job = require("../models/Job");
const User = require("../models/User");

exports.createJobService = async (data) => {
  const job = await Job.create(data);

  const { _id: jobId, manager } = job;

  const res = await User.updateOne(
    { _id: manager.id },
    { $push: { jobs: jobId } }
  );
  return job;
};

exports.getJobService = async (filters, queries) => {
  const result = await Job.find(filters)
    .sort(queries.sortBy)
    .select(queries.fields);
  return result;
};

exports.findManagerJobsService = async (managers) => {
  // const { id } = managers;
  // console.log(id);
  // const user = await User.find({}).populate("jobs");
  // return user;
};

exports.findJobByIdService = async (id) => {
  const job = await (await Job.findOne({ _id: id })).populate("applys");
  return job;
};
exports.getJobByIdService = async (id) => {
  const job = await Job.findOne({ _id: id }).populate("manager.id");
  return job;
};

exports.updateJObByIdService = async (productId, data) => {
  const result = await Job.updateOne({ _id: productId }, data, {
    runValidators: true,
  });
  return result;
};

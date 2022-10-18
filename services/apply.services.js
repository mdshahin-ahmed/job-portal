const Apply = require("../models/Apply");
const Job = require("../models/Job");

exports.createApplyService = async (data) => {
  const apply = await Apply.create(data);

  const { _id: applyId, job } = apply;
  // console.log(applyId);

  const res = await Job.updateOne(
    { _id: job.id },
    { $push: { applys: applyId } }
  );
  return apply;
};

exports.getAllApplyService = async () => {
  const apply = await Apply.find({});
  console.log(apply);
  return apply;
};

const query = require("express/lib/middleware/query");
const {
  createJobService,
  getJobService,
  updateJObByIdService,
  findJobByIdService,
  getJobByIdService,
} = require("../services/job.services");
const { findUserByEmail } = require("../services/user.services");

exports.createJob = async (req, res, next) => {
  try {
    const result = await createJobService(req.body);

    res.status(200).json({
      status: "success",
      message: "Successfully created the Job",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

exports.getJob = async (req, res, next) => {
  try {
    const filters = { ...req.query };

    const excludeFields = ["sort", "page", "limit"];
    excludeFields.forEach((field) => delete filters[field]);

    const queries = {};

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
    }

    const job = await getJobService(filters, queries);
    res.status(200).json({
      status: "success",
      data: job,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

exports.getManagerJob = async (req, res, next) => {
  try {
    const user = await (
      await findUserByEmail(req.user?.email)
    ).populate("jobs");

    const { jobs, ...others } = user;

    // const id = user;
    // // const { password, ...others } = user._doc;

    // const jobs = await findManagerJobsService(user);

    res.status(200).json({
      status: "success",
      data: {
        jobs,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

exports.getManagerJobById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const job = await findJobByIdService(id);

    res.status(200).json({
      status: "success",
      data: {
        job,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

exports.getJobById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const job = await getJobByIdService(id);

    res.status(200).json({
      status: "success",
      data: {
        job,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

exports.updateJobById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateJObByIdService(id, req.body);
    res.status(200).json({
      status: "success",
      message: "successfully updated the job",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "could't update the job",
      error: error.message,
    });
  }
};

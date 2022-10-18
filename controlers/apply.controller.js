const {
  createApplyService,
  getAllApplyService,
} = require("../services/apply.services");

exports.createApply = async (req, res, next) => {
  try {
    const apply = await createApplyService(req.body);

    res.status(200).json({
      status: "success",
      message: "Successfully created the Job",
      data: apply,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};
exports.getAllApply = async (req, res, next) => {
  try {
    const apply = await getAllApplyService();

    res.status(200).json({
      status: "success",
      message: "Successfully created the Job",
      data: apply,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

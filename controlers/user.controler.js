const { signupService } = require("../services/user.services");

exports.signup = async (req, res, next) => {
  try {
    const user = await signupService(req.body);
    res.status(200).json({
      status: "success",
      message: "successfully created the user",      
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error: error.message,
    });
  }
};

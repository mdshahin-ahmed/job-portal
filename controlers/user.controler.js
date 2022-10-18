const {
  signupService,
  getAllUserService,
  findUserByEmail,
  updateUserService,
} = require("../services/user.services");
const { generateToken } = require("../utils/token");

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

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        status: "fail",
        error: "Please provide your credentials",
      });
    }

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        status: "fail",
        error: "No user found. Please create an account",
      });
    }

    const isPasswordValid = user.comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(403).json({
        status: "fail",
        error: "Password is not correct",
      });
    }

    if (user.status !== "active") {
      return res.status(401).json({
        status: "fail",
        error: "Your account is not active yet.",
      });
    }

    // generat token

    const token = generateToken(user);

    const { password: pwd, ...others } = user.toObject();

    res.status(200).json({
      status: "success",
      message: "successfully login",
      data: {
        user: others,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error: error.message,
    });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await findUserByEmail(req.user?.email);

    const { password, ...others } = user._doc;

    res.status(200).json({
      status: "success",
      data: {
        user: others,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error: error.message,
    });
  }
};

exports.allUsers = async (req, res, next) => {
  try {
    const user = await getAllUserService();

    res.status(200).json({
      status: "success",
      message: "successfully load all users",
      user,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error: error.message,
    });
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await updateUserService(id, req.body);

    res.status(200).json({
      status: "success",
      message: "successfully load all users",
      user,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error: error.message,
    });
  }
};

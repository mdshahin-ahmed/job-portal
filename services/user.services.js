const User = require("../models/User");

exports.signupService = async (userInfo) => {
  const user = await User.create(userInfo);
  return user;
};

exports.getAllUserService = async () => {
  const user = await User.find({});
  return user;
};

exports.findUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};
exports.updateUserService = async (id, data) => {
  const user = await User.updateOne({ _id: id }, data, {
    runValidators: true,
  });

  return user;
};

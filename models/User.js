const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { ObjectId } = mongoose.Schema.Types;

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      validate: [validator.isEmail, "Provide a valid Email"],
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "Email address is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      validate: {
        validator: (value) =>
          validator.isStrongPassword(value, {
            minLength: 6,
            minLowercase: 3,
            minNumbers: 1,
            minUppercase: 1,
            minSymbols: 1,
          }),
        message: "password {VALUE} is not strong enough.",
      },
    },
    confirmPassword: {
      type: String,
      required: [true, "please confirm your password"],
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "passord don't match!",
      },
    },
    role: {
      type: String,
      enum: ["candidate", "hiring-manager", "admin"],
      default: "candidate",
    },
    contactNumber: {
      type: String,
      validate: [
        validator.isMobilePhone,
        "please provide a valid contact number",
      ],
    },
    imageURL: {
      type: String,
      validate: [validator.isURL, "please provide a valid url"],
    },
    status: {
      type: String,
      default: "active",
      enum: ["active", "inactive", "blocked"],
    },
    jobs: [
      {
        type: ObjectId,
        ref: "Job",
      },
    ],
    passwordChangAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const password = this.password;

  const hashedPassword = bcrypt.hashSync(password);

  this.password = hashedPassword;
  this.confirmPassword = undefined;

  next();
});

userSchema.methods.comparePassword = function (password, hash) {
  const isPasswordValid = bcrypt.compareSync(password, hash);
  return isPasswordValid;
};

const User = mongoose.model("User", userSchema);

module.exports = User;

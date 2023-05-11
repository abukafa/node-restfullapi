const { check, validationResult } = require("express-validator");

const validator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({
      status: false,
      message: errors.array()[0].msg,
    });
  }
  next();
};

const valUser = [
  check("email", "Email is required.")
    .notEmpty()
    .matches(/.+@.+..+/)
    .withMessage("Invalid Email format."),
  check("password", "Password is required.")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Password minimal 6 karakter."),
];

const valJobs = [
  check("name", "Name is required.").notEmpty(),
  check("description", "Description is required.").notEmpty(),
];

module.exports = { validator, valUser, valJobs };

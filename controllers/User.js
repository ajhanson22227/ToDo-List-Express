const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.create = async (req, res) => {
  //check if username exists
  const usernameExist = await User.findOne({
    username: req.body.username,
  });
  if (usernameExist) {
    return res.status(400).json({ err: "Username Already Exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    username: req.body.username,
    password: hashPassword,
  });

  try {
    await user.save();
    return;
  } catch (err) {
    res.status(400).json(err);
  }
};

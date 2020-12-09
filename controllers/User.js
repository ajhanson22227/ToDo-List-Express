const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.create = async (req, res) => {
  //check if username exists
  const usernameExist = await User.findOne({
    username: req.body.username,
  });
  if (usernameExist) {
    return res.status(400).json({ err: 'Username Already Exists' });
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

exports.login = async (req, res) => {
  //check for username in db
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.status(400).json({ loginError: 'Invalid username' });
  }

  //check if password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    return res.status(400).json({ passwordError: 'Invalid Password' });
  }

  //create and sign user token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.json({
    username: user.username,
    token: token,
  });
};

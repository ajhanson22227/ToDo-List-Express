const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.create = async (req, res) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  // check if username exists
  const usernameExist = await User.findOne({
    username: req.body.username,
  });
  if (usernameExist) {
    return res.send({ err: 'Username Already Exists' });
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    username: req.body.username,
    password: hashPassword,
  });

  try {
    await user.save();
    // eslint-disable-next-line no-underscore-dangle
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    return res.send({ user: { username: user.username, token } });
  } catch (err) {
    return res.status(400).json(err);
  }
};

exports.login = async (req, res) => {
  // check for username in db
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.status(400).send({ err: 'Invalid username' });
  }

  // check if password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    return res.status(400).send({ err: 'Invalid Password' });
  }

  // create and sign user token
  // eslint-disable-next-line no-underscore-dangle
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  return res.send({
    user: {
      username: user.username,
      token,
    },
  });
};

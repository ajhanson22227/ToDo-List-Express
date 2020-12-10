const Project = require('../models/Project');

exports.getProjects = (req, res) => {
  res.json({ message: 'We got the get request' });
};

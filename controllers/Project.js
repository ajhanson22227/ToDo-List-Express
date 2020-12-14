/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const Project = require('../models/Project');

exports.getProjects = async (req, res) => {
  const usertoken = req.header('user-token');
  const verified = jwt.verify(usertoken, process.env.TOKEN_SECRET);
  const projects = await Project.find({ user: verified._id });
  res.json(projects);
};

exports.createProjects = async (req, res) => {
  const usertoken = req.header('user-token');
  const verified = jwt.verify(usertoken, process.env.TOKEN_SECRET);
  const project = new Project({
    title: req.body.title,
    description: req.body.description,
    user: verified._id,
  });

  try {
    await project.save();
    // eslint-disable-next-line no-underscore-dangle
    return res.json(project);
  } catch (err) {
    return res.status(400).json(err);
  }
};

exports.deleteProject = async (req, res) => {
  const { id } = req.params;
  await Project.findByIdAndDelete(id);
};

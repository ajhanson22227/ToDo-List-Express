const Task = require('../models/Task');
const Project = require('../models/Project');

exports.create = async (req, res) => {
  const task = new Task({
    description: req.body.description,
    priority: req.body.priority,
    project: req.body.project,
  });

  const project = await Project.findById(req.body.project);
  project.tasks.push(task);
  try {
    await task.save();
    await Project.findByIdAndUpdate(req.body.project, project);
    res.json(task);
  } catch (err) {
    res.json(err);
  }
};

const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    min: 1,
    max: 255,
    required: true,
  },
  description: {
    type: String,
    required: true,
    min: 1,
    max: 255,
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
      required: false,
    },
  ],
});

module.exports = mongoose.model('Project', projectSchema);

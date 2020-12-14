const express = require('express');

const router = express.Router();
const projectController = require('../controllers/Project');

/* GET users listing. */
router.get('/', projectController.getProjects);
router.post('/create', projectController.createProjects);
router.post('/:id/delete', projectController.deleteProject);
router.get('/:id/getproject', projectController.getProject);

module.exports = router;

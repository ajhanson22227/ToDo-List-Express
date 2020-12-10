const express = require('express');

const router = express.Router();
const projectController = require('../controllers/Project');

/* GET users listing. */
router.get('/', projectController.getProjects);

module.exports = router;

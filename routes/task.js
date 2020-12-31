const express = require('express');

const router = express.Router();
const taskController = require('../controllers/Task');

/* GET users listing. */
router.post('/:projid/create', taskController.create);
router.post('/:taskid/delete', taskController.delete);

module.exports = router;

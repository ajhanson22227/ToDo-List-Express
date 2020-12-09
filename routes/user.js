var express = require("express");
var router = express.Router();
const userController = require("../controllers/User");

/* GET users listing. */
router.post("/create", userController.create);
router.post("/login", userController.login);

module.exports = router;

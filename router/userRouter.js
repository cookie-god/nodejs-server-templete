const userController = require('../controllers/userController.js');

var express = require('express');
var router = express.Router();

router.post('/enroll', userController.enroll);
router.post('/login', userController.login);

module.exports = router;
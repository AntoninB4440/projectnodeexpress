const userController = require('../controller/user.controller');
var express = require('express');
var router = express.Router();

router.post('/login', userController.login);

router.post('/register' , userController.register);

router.put('/me/modify-email', userController.modifyEmail);

router.put('/me/modify-password', userController.modifyPW);

router.delete('/me/delete', userController.remove);


module.exports = router ;
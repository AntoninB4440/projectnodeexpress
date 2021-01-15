const userController = require('../controller/user.controller');
var express = require('express');
var router = express.Router();

router.get('/me' , userController.getUserInfo);

router.post('/me' , userController.createSorT);

router.post('/login', userController.login);

router.post('/register' , userController.register);

router.put('/me/modify-email', userController.modifyEmail);

router.put('/me/modify-password', userController.modifyPW);

router.put('/me' , userController.modifySorT)

router.delete('/me/delete', userController.remove);


module.exports = router ;
const studentController = require('../controller/student.controller');
var express = require('express');
var router = express.Router();

router.get('/', studentController.getAll);

router.get('/:id' , studentController.getById);

router.post('/', studentController.create);

router.post('/friendship/:id' , studentController.addFriend);

router.post('/enroll/:id' , studentController.addLesson)

router.put('/:id', studentController.update);

router.delete('/:id', studentController.remove);

router.delete('/friendship/:id' , studentController.removeFriend);


module.exports = router ;
const teacherController = require('../controller/teacher.controller');
var express = require('express');
var router = express.Router();

router.get('/', teacherController.getAll);

router.get('/:id' , teacherController.getById);

router.post('/', teacherController.create);

router.post('/enroll/:id' , teacherController.addLesson)

router.put('/:id', teacherController.update);

router.delete('/:id', teacherController.remove);


module.exports = router ;
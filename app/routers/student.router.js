const studentController = require('../controller/student.controller');
var express = require('express');
var router = express.Router();

router.get('/', studentController.getAll);

router.get('/:id' , studentController.getById);

router.post('/', studentController.create);

router.put('/:id', studentController.update);

router.delete('/:id', studentController.remove);


module.exports = router ;
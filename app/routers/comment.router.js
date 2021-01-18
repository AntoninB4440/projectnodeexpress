const commentController = require('../controller/comment.controller');
var express = require('express');
var router = express.Router();

router.get('/' , commentController.getAll);

router.get('/:id' , commentController.getById);

router.post('/publication/:id' , commentController.create);

router.put('/:id', commentController.update);

router.delete('/:id', commentController.remove);


module.exports = router ;
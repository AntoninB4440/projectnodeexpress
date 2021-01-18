const publicationController = require('../controller/publication.controller');
var express = require('express');
var router = express.Router();

router.get('/' , publicationController.getAll);

router.get('/:id' , publicationController.getById);

router.post('/' , publicationController.create);

router.put('/:id', publicationController.update);

router.delete('/:id', publicationController.remove);


module.exports = router ;
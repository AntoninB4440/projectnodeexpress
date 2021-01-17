const db = require('../models/db');
const Lesson = db.lessons;
const lessonService = require('../services/lessons.services');

///////////////////GET METHOD
exports.getAll = async (req , res) => {
    try{
        let lessonList = await Lesson.findAll();
        //console.log(lessonList);
        let newLessonList = lessonList.map( element => {
            return lessonService.checkFinished(element)
        });
        res.json(newLessonList);
    } catch (error){
        console.log(error);
        res.status(500);
        res.json({'message :' : error});
    }
};

exports.getById = async (req , res) => {
    if (req.params.id) {
        try {
            let lessonFound = await Lesson.findByPk(req.params.id);
            let newLessonFound = await lessonService.checkFinished(lessonFound);
            res.json(newLessonFound);
     
        } catch (e) {
            console.log(e);
            res.status(500)
            res.json({ "message": e });
         }
     } else {
        res.json(400)
        res.json({error: `Bad query buddy`});
     } 
};

//////////////////POST METHOD
exports.create = async (req , res) => {
    if (req.body.title && req.body.hours && req.body.description && req.body.starting_date && req.body.ending_date) {

        try {
            let newLesson = await Lesson.create(req.body);
            res.json(newLesson);
        } catch (e) {
            res.status(500)
            res.json({ error: e });
        }
         
    } else {
        res.status(400)
        res.json({error: `Few fields missing, please fill all the fields`});
    }
};

/////////////////UPDATE METHOD
exports.update = async (req , res) => {
    if (req.body.title && req.body.hours && req.body.description && req.body.starting_date && req.body.ending_date && req.params.id) {
        try {
            await Lesson.update(req.body, {
                where: {
                    id: req.params.id
                }
            });

            res.json({ id: req.params.id, ...req.body });
        } catch (e) {
            res.json(500);
            res.json({ error: e });
        }
               
    } else {
        res.status(400);
        res.json({error: 'bad request'});
    }

};

////////////////DELETE METHOD
exports.remove = async (req , res) => {
    if (req.params.id) {
        try {
            await Lesson.destroy({
                where: {
                    id: req.params.id
                }
            });
            res.json({"message : " : `The lesson with the id ${req.params.id} has been removed`})
        } catch (e) {
        res.status(500)
        res.json({ "message": e });
        }
    } else {
        res.status(400);
        res.json({'message : ' : "Bad request sorry"})
    }

};
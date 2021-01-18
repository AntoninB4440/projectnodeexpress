let db = require('../models/db');
const publicationModel = require('../models/publication.model');
let jwt = require('../services/auth.services');

const Lessons = db.lessons;
const Teachers = db.teachers;
const Students = db.students;
const Users = db.users;
const Publication = db.publications;

//////////////////////////////GET METHOD
exports.getAll = async(req,res) => {
    try {
        let listePublication = await Publication.findAll();
        if (listePublication.length === 0){
            res.status(404);
            res.json({'message' : 'Empty publication list'});
            return;
        }

        res.json(listePublication);

    } catch (error) {
        res.status(500);
        res.json({'Error : ' : error})
    }
};

exports.getById = async (req,res) => {
    try {
        const publiFound = await Publication.findByPk(req.params.id);
        if (publiFound === null){
            res.status(404);
            res.json({'message' : 'No publication found with this id'});
            return;
        }
        res.json({'Publication :' : publiFound})
    } catch (error) {
        res.status(500);
        res.json({'Error : ' : error})
    }
};

/////////////////////////////POST METHOD
exports.create = async (req,res) => {
    //Récupération du token
    let token = req.headers['x-access-token'];

    //vérification de la validité du token 
    let verifyToken = await jwt.verifyToken(token);

    //si token no valide
    if(!verifyToken){
        res.status(401);
        res.json({'Message : ' : 'Accès interdit veuillez vous identifier'});
        return;
    }

    if (req.body.title && req.body.body_text && req.body.type && req.body.lesson_id){
        try {
                const user = await Users.findByPk(verifyToken);
            //check if user is binded to a student or a teacher
            if(user.StudentId === null && user.TeacherId === null){
                res.status(412);
                res.json({'Message :' : "You are neither a Student or a Teacher, please fill in your profil"})
            }

            //Vérif si le cours existe
            const lessonFound = await Lessons.findByPk(req.body.lesson_id);

            if (lessonFound === null){
                res.status(404);
                res.json({ 'message : ' : 'No lesson found with this id'});
            }

            if (user.type === 1){
                const student = await Students.findByPk(user.StudentId);
                const publiCreated = await Publication.create(req.body);

                await publiCreated.setStudent(student);
                await publiCreated.setLesson(lessonFound);
                res.json(publiCreated);

            } else if (user.type === 2){
                const teacher = await Students.findByPk(user.TeacherId);
                const publiCreated = await Publication.create(req.body);

                await publiCreated.setTeacher(teacher);
                await publiCreated.setLesson(lessonFound);
                res.json(publiCreated);
            }
        } catch (error) {
            console.log(error)
            res.status(500);
            res.json({'Error : ' : error})
        }
    } else {
        res.status(400);
        res.json({ 'message : ' : 'bad request sorry'});
    }
};


/////////////////////////////PUT METHOD
exports.update = async (req,res) => {
    //Récupération du token
    let token = req.headers['x-access-token'];

    //vérification de la validité du token 
    let verifyToken = await jwt.verifyToken(token);

    //si token no valide
    if(!verifyToken){
        res.status(401);
        res.json({'Message : ' : 'Accès interdit veuillez vous identifier'});
        return;
    }

    if (req.body.title && req.body.body_text && req.body.type && req.body.lesson_id){
        try {
            const user = await Users.findByPk(verifyToken);
            //check if user is binded to a student or a teacher
            if(user.StudentId === null && user.TeacherId === null){
                res.status(412);
                res.json({'Message :' : "You are neither a Student or a Teacher, please fill in your profil"})
            }

            //Vérif si la publication existe
            const publiFound = await Publication.findByPk(req.params.id);
            console.log(publiFound)
            console.log(user.StudentId);

            if (publiFound === null){
                res.status(404);
                res.json({ 'message : ' : 'No Publication found with this id'});
            }

            if (user.StudentId !== publiFound.dataValues.StudentId || user.TeacherId !== publiFound.dataValues.TeacherId){
                res.json(409);
                res.json({"Message " : "Sorry this publication is not yours, you can not modify it"})
                }    
            

            await Publication.update(req.body, {
                where: {
                   id: req.params.id
                }
             });

            res.json({"Message" : `The publication at ID ${req.params.id} has been modified`});

        } catch (error) {
            console.log(error)
            res.status(500);
            res.json({'Error : ' : error})
        }
    } else {
        res.status(400);
        res.json({ 'message : ' : 'bad request sorry'});
    }
};


/////////////////////////////DELETE METHOD
exports.remove = async (req,res) => {
    //Récupération du token
    let token = req.headers['x-access-token'];

    //vérification de la validité du token 
    let verifyToken = await jwt.verifyToken(token);

    //si token no valide
    if(!verifyToken){
        res.status(401);
        res.json({'Message : ' : 'Accès interdit veuillez vous identifier'});
        return;
    }

    if (req.params.id){
        try {
            const user = await Users.findByPk(verifyToken);
            //check if user is binded to a student or a teacher
            if(user.StudentId === null && user.TeacherId === null){
                res.status(412);
                res.json({'Message :' : "You are neither a Student or a Teacher, please fill in your profil"})
            }

            //Vérif si la publication existe
            const publiFound = await Publication.findByPk(req.params.id);

            if (publiFound === null){
                res.status(404);
                res.json({ 'message : ' : 'No Publication found with this id'});
            }

            if (user.StudentId !== publiFound.dataValues.StudentId || user.TeacherId !== publiFound.dataValues.TeacherId){
                res.json(409);
                res.json({"Message " : "Sorry this publication is not yours, you can not remove it"})
                }    
            

            await Publication.destroy({
                where: {
                   id: req.params.id
                }
             });

            res.json({"Message" : `The publication at ID ${req.params.id} has been removed`});

        } catch (error) {
            console.log(error)
            res.status(500);
            res.json({'Error : ' : error})
        }
    } else {
        res.status(400);
        res.json({ 'message : ' : 'bad request sorry'});
    }
};

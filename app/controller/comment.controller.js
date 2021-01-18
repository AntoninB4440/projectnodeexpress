let db = require('../models/db');
let jwt = require('../services/auth.services');

const Teachers = db.teachers;
const Students = db.students;
const Users = db.users;
const Publication = db.publications;
const Comment = db.comments;

//////////////////////////////GET METHOD
exports.getAll = async(req,res) => {

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

    try {
        let listeComment= await Comment.findAll();
        if (!listeComment.length === 0){
            res.status(404);
            res.json({'message' : 'Empty Comment list'});
            return;
        }

        res.json(listeComment);

    } catch (error) {
        res.status(500);
        res.json({'Error : ' : error})
    }
};

exports.getById = async (req,res) => {

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

    try {
        const commentFound = await Comment.findByPk(req.params.id);
        if (commentFound === null){
            res.status(404);
            res.json({'message' : 'No comment found with this id'});
            return;
        }
        res.json({'Publication :' : commentFound})
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

    if (req.body.body_text){
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

            if (user.type === 1){
                const student = await Students.findByPk(user.StudentId);
                const commentCreated = await Comment.create(req.body);

                await commentCreated.setStudent(student);
                await commentCreated.setPublication(publiFound);
                res.json(commentCreated);

            } else if (user.type === 2){
                const teacher = await Teachers.findByPk(user.StudentId);
                const commentCreated = await Comment.create(req.body);

                await commentCreated.setTeacher(teacher);
                await commentCreated.setPublication(publiFound);
                res.json(commentCreated);
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

    if (req.body.body_text){
        try {
            const user = await Users.findByPk(verifyToken);
            //check if user is binded to a student or a teacher
            if(user.StudentId === null && user.TeacherId === null){
                res.status(412);
                res.json({'Message :' : "You are neither a Student or a Teacher, please fill in your profil"})
            }

            //Vérif si la publication existe
            const commentFound = await Comment.findByPk(req.params.id);

            if (commentFound === null){
                res.status(404);
                res.json({ 'message : ' : 'No Publication found with this id'});
            }

            if (user.StudentId !== commentFound.dataValues.StudentId || user.TeacherId !== commentFound.dataValues.TeacherId){
                res.json(409);
                res.json({"Message " : "Sorry this publication is not yours, you can not modify it"})
                }    
            

            await Comment.update(req.body, {
                where: {
                   id: req.params.id
                }
             });

            res.json({"Message" : `The comment at ID ${req.params.id} has been modified`});

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
            const commentFound = await Comment.findByPk(req.params.id);

            if (commentFound === null){
                res.status(404);
                res.json({ 'message : ' : 'No Publication found with this id'});
            }

            if (user.StudentId !== commentFound.dataValues.StudentId || user.TeacherId !== commentFound.dataValues.TeacherId){
                res.json(409);
                res.json({"Message " : "Sorry this publication is not yours, you can not remove it"})
                }    
            

            await Comment.destroy({
                where: {
                   id: req.params.id
                }
             });

            res.json({"Message" : `The comment at ID ${req.params.id} has been removed`});

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

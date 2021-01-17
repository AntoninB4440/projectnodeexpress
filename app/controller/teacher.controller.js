let  db = require('../models/db');
let jwt = require('../services/auth.services');

let  TeacherC = require('../models/teacher.class');

const Teachers = db.teachers;
const Users = db.users;
const Lessons = db.lessons;

////////////////////// GET METHOD
exports.getAll = async (req , res) => {
    
    //Récupération du token
    let token = req.headers['x-access-token'];

    //vérification de la validité du token 
    let verifyToken = await jwt.verifyToken(token);

    //si token no valide
    if(!verifyToken){
        res.status(401);
        res.json({'Message : ' : 'Accès interdit veuillez vous identifier'});
    } else {
        //si token valide
        try {
            let teacherList = await Teachers.findAll();
           
            if (teacherList.length > 0) {      
                 res.json(teacherList);
            } else {
                res.json(404);
                res.json({'message :' : 'Empty teacher list'})
            }
        } catch (error) {
            console.log(error)
            res.json(500);
            res.json({'Erreur : ' : error})
        }
    }
};

exports.getById = async (req , res) => {
    //Récupération du token
    let token = req.headers['x-access-token'];

    //vérification de la validité du token 
    let verifyToken = await jwt.verifyToken(token);

    //si token no valide
    if(!verifyToken){
        res.status(401);
        res.json({'Message : ' : 'Accès interdit veuillez vous identifier'});
    } else {
        //si token valide 
        try {
            let teacherFound = await Teachers.findByPk(req.params.id);
        
            if (!teacherFound) {
                res.json(404);
                res.json({'message :' : 'No teacher at this ID'})            
            }
            res.json(teacherFound); 
            
        } catch (error) {
            res.json(500);
            res.json({'Erreur : ' : error})
        }  
    } 

};

////////////////////////POST METHOD
exports.create = async (req , res) => {
    if (req.body.first_name && req.body.last_name && req.body.bio && req.body.subject){
        try {
            let newTeacher = await Teachers.create(req.body);
            return newTeacher;
        } catch (error) {
            res.status(500);
            res.json({'message : ' : error});
        }
    } else {
        res.status(400);
        res.json({ 'message : ' : 'bad query sorry'});
    }
};


exports.addLesson = async (req,res) => {
    //Récupération du token
    let token = req.headers['x-access-token'];

    //vérification de la validité du token 
    let verifyToken = await jwt.verifyToken(token);

    //si token no valide
    if(!verifyToken){
        res.status(401);
        res.json({'Message : ' : 'Accès interdit veuillez vous identifier'});
    }

    if(req.params.id){
        try {
            let user = await Users.findByPk(verifyToken);
            let teacher = await Teachers.findByPk(user.TeacherId);
            let lesson = await Lessons.findByPk(req.params.id);
            if(!lesson){
                res.json(404)
                res.json({"Message :" : "No lesson with this ID sorry"})
            }
            await teacher.setLessons(lesson);
            res.json({'Message : ' : `You just sign in for the lesson ${lesson.dataValues.title}`});
        } catch (error) {
            res.status(500);
            console.log(error);
        }
    } else {
        res.json(404);
        res.json({'message :' : 'No Student at this ID'})
    }
};

////////////////////////UPDATE METHOD
exports.update = async (req , res) => {
    //Récupération du token
    let token = req.headers['x-access-token'];

    //vérification de la validité du token 
    let verifyToken = await jwt.verifyToken(token);

    //si token no valide
    if(!verifyToken){
        res.status(401);
        res.json({'Message : ' : 'Accès interdit veuillez vous identifier'});
    } else {
        //si token valide 
        try {
            await Teachers.update(req.body, {
              where: {
                 id: req.params.id
              }
           });
             res.json({id:req.params.id,...req.body});
        } catch (e) {
           resp.json(500);
           resp.json({ error: e });
        }
    }
};


///////////////////////////////DELETE METHOD
exports.remove = async (req , res) => {
    //Récupération du token
    let token = req.headers['x-access-token'];

    //vérification de la validité du token 
    let verifyToken = await jwt.verifyToken(token);

    //si token no valide
    if(!verifyToken){
        res.status(401);
        res.json({'Message : ' : 'Accès interdit veuillez vous identifier'});
    } else {
        //si token valide 
        try {
            await Teachers.destroy({
              where: {
                 id: req.params.id
              }
            });
        res.status(200);
             res.json({"message":`The teacher with the id ${req.params.id} has been removed`});
        } catch (e) {
           res.json(500);
           res.json({ error: e });
        }
    }
};
let  db = require('../models/db');
let jwt = require('../services/auth.services');

const studentService = require('../services/students.services');

let  StudentC = require('../models/student.class');
const { students } = require('../models/db');

const Students = db.students;
const Users = db.users;

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
            let studentList = await Student.findAll();
           
            if (studentList.length > 0) {
                let newStudentList = studentList.map( result => {
                    result.dataValues.age =studentService.getYears(result.dataValues.birthdate);
                    return StudentC.fromJson(result.dataValues)
                 });
         
                 res.json(newStudentList);
            } else {
                res.json(404);
                res.json({'message :' : 'Empty student list'})
            }
        } catch (error) {
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
            let studentFound = await Student.findByPk(req.params.id);
           
            if (studentFound) {
                studentFound.dataValues.age = studentService.getYears(studentFound.dataValues.birthdate)
                    
                let newStudentFound = StudentC.fromJson(studentFound.dataValues);
         
                res.json(newStudentFound);
            } else {
                res.json(404);
                res.json({'message :' : 'No Student at this ID'})
            }
        } catch (error) {
            res.json(500);
            res.json({'Erreur : ' : error})
        }
    }

    
};

////////////////////////POST METHOD
exports.create = async (req , res) => {
    if (req.body.first_name && req.body.last_name && req.body.bio && req.body.level && req.body.birthdate){
        try {
            let newStudent = await Student.create(req.body);
            return newStudent;
        } catch (error) {
            res.status(500);
            res.json({'message : ' : error});
        }
    } else {
        res.status(400);
        res.json({ 'message : ' : 'bad query sorry'});
    }
};

exports.addFriend = async (req, res) => {
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
            let student1 = await Students.findByPk(user.StudentId);
            let student2 = await Students.findByPk(req.params.id);
            await student1.setFriends(student2);
            res.json({'Message : ' : ` ${student2.dataValues.first_name} has been added to your friend list `});
        } catch (error) {
            res.status(500);
            console.log(error);
        }
    } else {
        res.json(404);
        res.json({'message :' : 'No Student at this ID'})
    }
    
};

exports.addLesson = async (req,res) => {

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
            await Student.update(req.body, {
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
    let verifyToken = jwt.verifyToken(token);

    //si token no valide
    if(!verifyToken){
        res.status(401);
        res.json({'Message : ' : 'Accès interdit veuillez vous identifier'});
    } else {
        //si token valide 
        try {
            await Student.destroy({
              where: {
                 id: req.params.id
              }
            });
        res.status(200);
             res.json({"message":`The student with the id ${req.params.id} has been removed`});
        } catch (e) {
           res.json(500);
           res.json({ error: e });
        }
    }
};

exports.removeFriend = async (req,res) => {
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
            let student1 = await Students.findByPk(user.StudentId);
            let student2 = await Students.findByPk(req.params.id);
            await student1.removeFriends(student2);
            res.json({'Message : ' : `${student2.dataValues.first_name} has been removed from you friend list`});
        } catch (error) {
            res.status(500);
            console.log(error);
        }
    } else {
        res.json(404);
        res.json({'message :' : 'No Friend at this ID'})
    }
};
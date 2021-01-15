let  db = require('../models/db');
let jwt = require('../services/auth.services');
const Student = db.students;
const studentService = require('../services/students.services');
let  StudentC = require('../models/student.class');


exports.create = async (req , res) => {
    if (req.body.first_name && req.body.last_name && req.body.bio && req.body.level && req.body.birthdate){
        try {
            let newStudent = await Student.create(req.body);
            return newStudent ;
        } catch (error) {
            res.status(500);
            res.json({'message : ' : error});
        }
    } else {
        res.status(400);
        res.json({ 'message : ' : 'bad query sorry'});
    }
};

exports.getAll = async (req , res) => {
    
    //Récupération du token
    let token = req.headers['x-access-token'];

    //vérification de la validité du token 
    let verifyToken = await jwt.verifyToken(token);
    //console.log(verifyToken);

    //si token no valide
    if(!verifyToken){
        res.status(401);
        res.json({'Message : ' : 'Accès interdit veuillez vous identifier'});
    } else {
        //si token valide
        try {
            let studentList = await Student.findAll();
           
            if (studentList.length > 0) {
                let newStudentList = studentList.map( async result => {
                    let age = await studentService.getYears(result.dataValues.birthdate);
                    return new StudentC.fromJson(result.dataValues);
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
                let age = studentService.getYears(studentFound.dataValues.birthdate)
                    
                let newStudentFound = new StudentC(studentFound.dataValues.id, 
                    studentFound.dataValues.first_name, 
                    studentFound.dataValues.last_name, 
                    studentFound.dataValues.bio, 
                    studentFound.dataValues.level, 
                    studentFound.dataValues.birthdate, 
                    age
                );
         
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
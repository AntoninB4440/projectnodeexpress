let  db = require('../models/db');
let jwt = require('../config/auth.config');
const Student = db.students;
const studentService = require('../services/students.services');
let  StudentC = require('../models/student.class');


exports.create = async (req , res) => {
    if (req.body.first_name && req.body.last_name && req.body.bio && req.body.level && req.body.birthdate){
        try {
            let newStudent = await Student.create(req.body);
            res.json({newStudent});
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
    
    /* //Récupération du token
    let token = req.headers['x-access-token'];

    //vérification de la validité du token 
    let verifyToken = jwt.verifyToken(token);

    //si token no valide
    if(!verifyToken){
        res.status(401);
        res.json({'Message : ' : 'Accès interdit veuillez vous identifier'});
    } else {
        //si token valide 
        
    } */

    try {
        let studentList = await Student.findAll();
       
        //console.log(resp);

        let newStudentList = studentList.map( result => {
           let age = studentService.getYears(result.dataValues.birthdate)
           console.log('HELLO THERE');
           console.log(result);
           //importer le service
           return new StudentC(result.dataValues.id, result.dataValues.first_name, result.dataValues.last_name, result.dataValues.bio, result.dataValues.level, result.dataValues.birthdate, age)
        });

        res.json(newStudentList);


    } catch (error) {
        res.json(500);
        res.json({'Erreur : ' : error})
    }

};

exports.getById = async (req , res) => {

};

exports.update = async (req , res) => {

};

exports.remove = async (req , res) => {

};
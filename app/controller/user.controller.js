const { response } = require('express');
let db = require('../models/db');
let jwt = require('../services/auth.services');

const Users = db.users;

exports.register = async (req,res) => {
    if (req.body.email && req.body.password && req.body.type){
        try {
            const userExist = await Users.findOne({ where : {email : req.body.email}
            });
            if (!userExist){
                let userCreated = await Users.create(req.body);
                res.json(userCreated);
            } else {
                res.status(409);
                res.json({ "message": 'Email already used '})
            }
        } catch (error) {
            res.status(500);
            res.json({ " message " : error})
        }
    }
}

exports.login = async (req,res) => {

    if (req.body.email && req.body.password){
        //Trouver le user correspondant au mail
        try {
            const user = await Users.findOne({where : { email: req.body.email}});

            if (!user){
                res.status(404);
                res.json({"message" : "No user found with this email"})
                return;
            }

            if (req.body.password == user.dataValues.password){
                let token = jwt.signToken(user.dataValues.id);
                if (user.type === 1 ){
                    let student = await user.getStudent();
                    res.json({
                        user : user,
                        student : student,
                        token : token
                    });
                } else {
                    let teacher = await user.getTeacher();
                    res.json({
                        user : user,
                        teacher : teacher,
                        token : token
                    });
                }
            } else {
                res.status(401);
                res.json({"message" : "Wrong password"});
            }
        } catch (error) {
            res.status(500);
            res.json({'message' : error})
        }
    } else {
        res.status(400);
        res.json({"message" : "bad query sorry"})
    }
}

exports.modifyEmail = async (req,res) => {
    
}

exports.modifyPW = async (req,res) => {
    
}

exports.remove = async (req,res) => {
    
}

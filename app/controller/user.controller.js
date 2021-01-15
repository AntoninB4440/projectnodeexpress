let db = require('../models/db');
let jwt = require('../services/auth.services');
let studentController = require('../controller/student.controller');
let teacherController = require('../controller/teacher.controller');

const Users = db.users;


//////////////////////////////////////////////GET METHOD 
exports.getUserInfo = async (req,res) => {

}

//////////////////////////////////////////////POST METHOD
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


exports.createSorT = async (req,res) => {
    //Récupération du token
    let token = req.headers['x-access-token'];

    //vérification de la validité du token 
    let verifyToken = await jwt.verifyToken(token);

    //si token no valide
    if(!verifyToken){
        res.status(401);
        res.json({'Message : ' : 'Accès interdit veuillez vous identifier'});
    }
    try {
        let user = await Users.findByPk(verifyToken);
        
        //if user is already binded
        if (user.StudentId || user.TeacherId){
            res.status(409);
            res.json({ "message" : "This user is already bind to a student or a teacher"})
            return;
        }

        //if user.type === if Student
        if (user.type === 1){
            let newStudent = await studentController.create(req,res);
            //console.log(newStudent);
            await user.setStudent(newStudent);
            //console.log(user);
            res.json({ student : newStudent});
        } else if (user.type === 2){
            let newTeacher = await teacherController.create(req,res);
            await user.setTeacher(newTeacher);
            res.json({teacher : newTeacher});
        }
    } catch (error) {
        res.status(500);
        res.json({'message' : error});
    }
}

///////////////////////////////////////////////////PUT METHOD
exports.modifyEmail = async (req,res) => {
    
}

exports.modifyPW = async (req,res) => {
    
}

exports.modifySorT = async (req,res) => {
    
}


///////////////////////////////////////////////////DELETE METHOD
exports.remove = async (req,res) => {
    
}

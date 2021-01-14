const Sequelize = require('sequelize');
const dbConfig = require("../config/db.config");

// Création d'un nouvel object Sequelize pour la connection
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.DIALECT
});

//Check de la connection avec la db
const connection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

connection();

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Import des différents models dans l'object db qui représente notre DB
db.comments = require('./comment.model')(sequelize,Sequelize);
db.lessons = require('./lesson.model')(sequelize,Sequelize);
db.teachers = require('./teacher.model')(sequelize,Sequelize);
db.students = require('./student.model')(sequelize,Sequelize);
db.publications = require('./publication.model')(sequelize,Sequelize);
db.users = require('./user.model')(sequelize,Sequelize);


//Etablissement des relations entre les tables
//User relation with Teacher and Student (One to One)
db.students.hasOne(db.users);
db.users.belongsTo(db.students);

db.teachers.hasOne(db.users);
db.users.belongsTo(db.teachers);

//Student relation with Publication/Comment/Student and Lesson
db.students.hasMany(db.publications);
db.publications.belongsTo(db.students);

db.students.hasMany(db.comments);
db.comments.belongsTo(db.students);

db.students.belongsToMany(db.lessons , { through: 'LessonStudents' });
db.lessons.belongsToMany(db.students , { through: 'LessonStudents' });

db.students.belongsToMany(db.students, { as : 'Friends' , through: 'StudentFriends' });

//Teacher relation with Publication/Comment/Lesson
db.teachers.hasMany(db.publications);
db.publications.belongsTo(db.teachers);

db.teachers.hasMany(db.comments);
db.comments.belongsTo(db.teachers);

db.teachers.belongsToMany(db.lessons , { through: 'LessonTeachers' });
db.lessons.belongsToMany(db.teachers , { through: 'LessonTeachers' });

//Publication relation with Comment
db.publications.hasMany(db.comments);
db.comments.belongsTo(db.publications);

//Lesson relation with Publication
db.lessons.hasMany(db.publications);
db.publications.belongsTo(db.lessons);

module.exports = db;






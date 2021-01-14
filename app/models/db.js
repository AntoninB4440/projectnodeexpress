const dbConfig = require('../config/db.config');
const Sequelize = require('sequelize');


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


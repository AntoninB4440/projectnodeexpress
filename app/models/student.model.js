module.exports = (sequelize,Sequelize) => {
    const Student = sequelize.define('Student', {
        id : {
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        first_name : {
            type : Sequelize.TEXT,
            allowNull : false,
        },
        last_name : {
            type : Sequelize.TEXT,
            allowNull : false,
        },
        bio: {
            type : Sequelize.TEXT,
            allowNull : false,
        },
        level : {
            type : Sequelize.TEXT,
            allowNull : false,
        },
        birthdate : {
            type : Sequelize.DATEONLY,
            allowNull : false,
        },
        age : {
            type : Sequelize.INTEGER,
            allowNull : true,
        },
        profile_picture : {
            type : Sequelize.TEXT,
            allowNull : true,
        },
    })
    return Student;
}
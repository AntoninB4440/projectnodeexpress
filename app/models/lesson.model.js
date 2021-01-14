module.exports = (sequelize,Sequelize) => {
    const Lesson = sequelize.define('Lesson', {
        id : {
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        title : {
            type : Sequelize.TEXT,
            allowNull : false,
        },
        hours : {
            type : Sequelize.INTEGER,
            allowNull : false,
        },
        description : {
            type : Sequelize.TEXT,
            allowNull : false,
        },
        file_name : {
            type : Sequelize.TEXT,
            allowNull : true,
        },
        starting_date : {
            type : Sequelize.DATEONLY,
            allowNull : false,
        },
        ending_date : {
            type : Sequelize.DATEONLY,
            allowNull : false,
        }
    })
    return Lesson;
}
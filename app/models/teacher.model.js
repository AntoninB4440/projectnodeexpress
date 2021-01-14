module.exports = (sequelize,Sequelize) => {
    const Teacher = sequelize.define('Teacher', {
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
        subject : {
            type : Sequelize.TEXT,
            allowNull : false,
        },
        profile_picture : {
            type : Sequelize.TEXT,
            allowNull : true,
        },
    })
    return Teacher;
}
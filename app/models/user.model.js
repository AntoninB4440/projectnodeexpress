module.exports = (sequelize,Sequelize) => {
    const User = sequelize.define('User', {
        id : {
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        email : {
            type : Sequelize.TEXT,
            allowNull : false,
        },
        password : {
            type : Sequelize.TEXT,
            allowNull : false,
        },
        type : {
            type : Sequelize.INTEGER,
            allowNull : false,
        },
    })
    return User;
}
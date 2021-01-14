module.exports = (sequelize,Sequelize) => {
    const Publication = sequelize.define('Publication', {
        id : {
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        title : {
            type : Sequelize.TEXT,
            allowNull : false,
        },
        body_text : {
            type : Sequelize.TEXT,
            allowNull : false,
        },
        type : {
            type : Sequelize.INTEGER,
            allowNull : false,
        }
    })
    return Publication;
}
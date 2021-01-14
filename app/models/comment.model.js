module.exports = (sequelize,Sequelize) => {
    const Comment = sequelize.define('Comment', {
        id : {
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        body_text : {
            type : Sequelize.TEXT,
            allowNull : false,
        }
    })
    return Comment;
}
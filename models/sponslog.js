module.exports = function(sequelize, DataTypes){
    return sequelize.define('sponslog',{

        event: DataTypes.STRING,
        size: DataTypes.STRING,
        duration: DataTypes.STRING,
        contact: DataTypes.STRING,
        owner: DataTypes.INTEGER
    })
}
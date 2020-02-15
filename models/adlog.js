module.exports = function(sequelize, DataTypes){
    return sequelize.define('adlog',{

        location: DataTypes.STRING,
        size: DataTypes.STRING,
        duration: DataTypes.STRING,
        contact: DataTypes.STRING,
        cost: DataTypes.STRING,
        owner: DataTypes.INTEGER
    })
}

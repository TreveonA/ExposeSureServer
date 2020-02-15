module.exports = function(sequelize, DataTypes){
    return sequelize.define('tablelog',{

        event: DataTypes.STRING,
        size: DataTypes.STRING,
        cost: DataTypes.STRING,
        contact: DataTypes.STRING,
        owner: DataTypes.INTEGER
    })
}
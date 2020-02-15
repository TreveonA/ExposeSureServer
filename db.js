const Sequelize = require ('sequelize')

const sequelize = new Sequelize('adopplog', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres'
})

sequelize.authenticate().then(
    function(){
        console.log('Connected to adopplog postgres database')
    }, 
    function(err){
        console.log(err)
    }
)

module.exports = sequelize
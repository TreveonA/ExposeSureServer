var express = require ('express')
var router = express.Router()
var sequelize = require('../db')
var User = sequelize.import('../models/user')
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')

router.post('/createuser', function(req, res){
    // var username = "fake@fake.com"
    // var pass = "fakepassword"

    var username = req.body.user.username
    var password = req.body.user.password

    User.create({
        username: username, 
        passwordhash: bcrypt.hashSync(password, 10)

    }).then(
        function createSuccess(user){
            var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24})

            res.json({
                user: user, 
                message: 'created',
                sessionToken: token
            })
        }, 
        function createError(err){
            res.send(500, err.message)
        }
    )
})

router.post("/signin", function (req, res){
    let email = req.body.user.username
    let password = req.body.user.password

    User.findOne({
        where: {username: email}
    }).then(user => {

        user ? comparePasswords(user) : res.send("User not found in our database")

        function comparePasswords(user){
            bcrypt.compare(password, user.passwordhash, function(err, matches){
                matches ? generateToken(user)  : res.send("Incorrect username/password combination")
            })

            }
            function generateToken(user){
                
                var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {
                    expiresIn: 60*60*24
                });
                res.json({
                user: user,
                message: 'created',
                sessionToken: token
                })
            }

        })
    })


module.exports = router
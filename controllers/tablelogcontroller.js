var express = require('express');
var router = express.Router()
var sequelize = require("../db");
var User = sequelize.import("../models/user");
var TableLogModel = sequelize.import("../models/tablelog")

router.post('/', function (req, res) {
    var owner = req.user.id
    var event = req.body.tablelog.event
    var size = req.body.tablelog.size
    var contact = req.body.tablelog.contact
    var cost = req.body.tablelog.cost

    TableLogModel.create({
        event: event,
        size: size, 
        contact: contact,
        cost: cost,
        owner: owner
    }).then( 
        function createSuccess(event) {
            res.json({
                event: event,
                size: size, 
                contact: contact,
                cost: cost
            })
        },
        function createError(err) {
            res.send(500, err.message)
        }
    )
})

router.get("/", function (req, res) {
    //grabbing all of the Grocery List items from data
    //database for a given user
    var userid = req.user.id
    TableLogModel.findAll({
        where: { owner: userid }
    }).then(
        function findAllSuccess(data) {
            res.json(data)
        }, function findAll(err) {
            res.send(500, err.message)
        })
})

router.get('/:id', function (req, res) {
    var primaryKey = req.params.id
    var userid = req.user.id
    TableLogModel.findOne({
        where: {
            id: primaryKey, 
            owner: userid
        }
    }).then(
        data => {
            return res.json(data)
        }),
        err => res.send(500, err.message)
})

router.put('/update/:id', function (req, res) {
    var owner = req.user.id
    var primaryKey = req.params.id
    var event = req.body.tablelog.event
    var size = req.body.tablelog.size
    var cost = req.body.tablelog.cost
    var contact = req.body.tablelog.contact

    TableLogModel.update({
        event: event,
        size: size,
        cost: cost,
        contact: contact, 
        owner: owner
    },
    {where:{id: primaryKey, owner: owner}}
    ).then(
        data => {
            return res.json(data)
        }),
        err => res.send(500, err.message)
})

router.delete('/delete/:id', function (req, res) {
    var primaryKey = req.params.id
    var userid = req.user.id
    
    TableLogModel.destroy({
        where:{
            id: primaryKey,
            owner: userid
        }
    }).then(data => {
        return data > 0
        ? res.send("Item was deleted")
        : res.send("Nothing deleted")
    }), 
    err => res.send(500, err.message)
})



module.exports = router;
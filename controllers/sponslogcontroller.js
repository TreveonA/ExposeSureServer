var express = require('express');
var router = express.Router()
var sequelize = require("../db");
var User = sequelize.import("../models/user");
var SponsLogModel = sequelize.import("../models/sponslog")

router.post('/', function (req, res) {
    var owner = req.user.id
    var event = req.body.sponslog.event
    var duration = req.body.sponslog.duration
    var contact = req.body.sponslog.contact
    var cost = req.body.sponslog.cost

    SponsLogModel.create({
        event: event,
        duration: duration, 
        contact: contact,
        cost: cost,
        owner: owner
    }).then( 
        function createSuccess(sponslog) {
            res.json({
                event: event,
                duration: duration, 
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
    SponsLogModel.findAll({
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
    SponsLogModel.findOne({
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
    var event = req.body.sponslog.event
    var duration = req.body.sponslog.duration
    var cost = req.body.sponslog.cost
    var contact = req.body.sponslog.contact

    SponsLogModel.update({
        event: event,
        duration: duration,
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
    
    SponsLogModel.destroy({
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
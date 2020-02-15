var express = require('express');
var router = express.Router()
var sequelize = require("../db");
var AdLogModel = sequelize.import("../models/adlog")

router.post('/', function (req, res) {
    var owner = req.user.id
    var opportunity = req.body.adlog.opportunity
    var duration = req.body.adlog.duration
    var size = req.body.adlog.size
    var contact = req.body.adlog.contact
    var cost = req.body.adlog.cost

    AdLogModel.create({
        opportunity: opportunity,
        size: size, 
        contact: contact,
        duration: duration,
        cost: cost,
        owner: owner
    }).then( 
        function createSuccess(adlog) {
            res.json({
                opportunity: opportunity,
                size: size, 
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
    AdLogModel.findAll({
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
    AdLogModel.findOne({
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
    var opportunity = req.body.adlog.opportunity
    var duration = req.body.adlog.duration
    var size = req.body.adlog.size
    var cost = req.body.adlog.cost
    var contact = req.body.adlog.contact

    AdLogModel.update({
        opportunity: opportunity,
        duration: duration,
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
    
    AdLogModel.destroy({
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

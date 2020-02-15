var express = require('express');
var router = express.Router()
var sequelize = require("../db");
var User = sequelize.import("../models/user");
var AuthTestModel = sequelize.import("../models/authtest")


// localhost:3000/authtest/getall
router.get('/getall', function(req, res){
    //Grabbing all of the Grocery List items from database for a given user
    //select * from AuthTest where owner = '3'
    var userid = req.user.id
    AuthTestModel.findAll({
        where: {owner: userid}
    }).then(
        function findAllSuccess(data){
            res.json(data)
        }, function findAll (err){
            res.send(500, err.message)
        }
    )
});

//Posting data for a given user
//loclahost:3000/api/authtet/create
//What Goes in the body???
//{authtestdata: {item: "item with something in it"}}


router.post('/create', function(req, res){
    var owner = req.user.id
    var authTestData = req.body.authtestdata.item

    AuthTestModel.create({
        authtestdata: authTestData, 
        owner: owner
    }).then(
        function createSuccess(authtestdata){
            res.json({
                authtestdata: authtestdata
            }), function createError(err){
                res.send(500, err.message);
            }
        }
    );
});


//Sometimes you want to get a single item that belongs to that user...

//Find a single item

//localhost:3000/authtest/[Primary Key Number]
//localhost:3000/authtest/7
//params are things that follow the final slash

router.get("/:id", function(req, res){
    var primarykey = req.params.id;
    var userid = req.user.id
    AuthTestModel.findOne(
        {
        where: {id:primarykey, 
        owner: userid
    }
    }
    ).then(
        data => {
            return data?res.json(data) : res.send("Not Authorized to view row")
        }), 
        err => res.send(500, err.message)
});


//[/delete/[number]]
//localhost:3000/authtest/delete/11
router.delete("/delete/:id", function(req, res){
    var primaryKey = req.params.id
    var userid = req.user.id

    AuthTestModel.destroy({
        where: {id: primaryKey, owner: userid}
    }).then(data => {
        return data > 0 
        ? res.send("item was delete")
        : res.send("Nothing deleted");
    }), 
    err => res.send(500, err.message);
});


//Updating Record for the individual
//Endpoint: /update/[number here]
//Acutal URL: localhost:3000/authtest/update/10
router.put("/update/:id", function(req, res){
    var userid = req.user.id;
    var primaryKey = req.params.id
    var authtestdata = req.body.authtestdata.item

    AuthTestModel.update({
        authtestdata: authtestdata
    }, 
    {where: {id: primaryKey, owner: userid}}
    ).then (data => {
       return data > 0 ? res.send("Item was updated") : res.send("Nothing Updated");
    }), err => res.send(500, error.message);

});
module.exports = router;
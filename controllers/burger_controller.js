var express = require("express");

var burgers = require("../models/burger.js");

var router = express.Router();

//get all burgers
//send request to module which sends it to orm
//orm returns via module, module returns it back to controller to be rendered
router.get('/', function(req, res){

    burgers.all(function(data){
      var hbsObject = {
        burger: data
      };
      console.log(hbsObject);
      res.render("index", hbsObject);
    });
});

router.post("/api/burgers", function(req, res){
  burgers.create([
    "burger_name", "devoured"
  ], [req.body.name, req.body.devoured], function(result){
    //send back the id of the new burger
    res.json({id: result.insertId});
  });
});

router.put("/api/burgers/:id", function(req,res){
  var condition = parseInt(req.params.id);

  console.log("condition", condition);

  burgers.update(condition, function(data){

    var hbsObject = {
      burgers: data
    };

    res.render("index", hbsObject);
  
  });
});




module.exports = router;
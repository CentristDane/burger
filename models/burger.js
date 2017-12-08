var orm = require("../config/orm.js");

//code to call the orm functions using burger specific input
var burgers = {
  all: function(cb){
    orm.selectAll("burgers", function(res){
      cb(res);
    });
  },

  create: function(cols, vals, cb){
    orm.insertOne("burgers", cols, vals, function(res){
      cb(res);
    });
  },

  update: function( condition, cb){
    orm.updateOne("burgers", "devoured", true, "id", condition, cb); 
  },

  remove: function(condition, cb){
    console.log(condition)
    orm.removeFromTable('burgers', condition, (res)=>{

      cb(res)
    });
  }
};


//export this code

module.exports = burgers;

// var orm = require("../config/orm.js");

// //create the code that will call the ORM functions using burger specific input for the ORM.
// var burger = {
//   all: function(cb) {
//     orm.selectAll(function(res) {
//       cb(res);
//     });
//   },
//   // The variables cols and vals are arrays.
//   create: function(vals, cb) {
//     orm.insertOne("burgers", vals, function(res) {
//       cb(res);
//     });
//   },
//   update: function(select, cb) {
//     orm.updateOne("burgers", select, function(res) {
//       cb(res);
//     });
//   }
// };

// // Export the database functions for the controller (catsController.js).
// module.exports = burger;

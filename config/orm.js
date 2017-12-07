var connection = require("./connection.js");

// Object Relational Mapper (ORM)

var orm = {
  selectAll: function() {
    var queryString = "SELECT * FROM burgers";
    connection.query(queryString, function(err, result) {
      console.log(result);
    });
  },
  insertOne: function(newBurger) {
   /////
    var queryString = "INSERT INTO burgers (burger_name) VALUES (?)";
    console.log(queryString);
    connection.query(queryString, [newBurger], function(err, result) {
      console.log(result);
    });
  },
  updateOne: function(select) {
    var queryString = "UPDATE burgers SET devoured = true WHERE id = ?";
    connection.query(queryString, [select], function(err, result) {
      console.log(result);
    });
  }
};

module.exports = orm;


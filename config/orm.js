//import mysql connection

var connection = require("../config/connection.js");


//helper function for SQL syntax
//from repo- let's say we want to pass 3 values into a jquery//in order to //write the query, we need 3 question marks
//this function loops through and creates an array of question marks
//and turns thme into a string

function questionMarks(num){
  var arr=[];

  for(var i=0; i < num; i++){
    arr.push("?");
  }

  return arr.toString();
}


//Helper function to convert object key/value pairs to SQL syntax

function objToSql(ob){

  var arr=[];

  //lopp through the keys and push the pair as a string into the array
  for(var key in ob){
    var value = ob[key];

    if(Object.hasOwnProperty.call(ob, key)){

      if(typeof value === "string" && value.indexOf(" ") >= 0){
        value = "'" + value + "'";
      }

      arr.push(key + "=" + value);
    }
  }

  return arr.toString();
}

//object for all our SQL statement functions
const orm = {
selectAll: function(table, cb){
//get table name from module requested from controller
//run a query, get data, return it to module
// module returns it back to controller

var queryString = `SELECT * FROM ${table};`;

connection.query(queryString, function(err, result){

  if(err){
    throw err;
  }
  cb(result);
});
},

insertOne: function(table, cols, vals, cb){
//we get a value to insert from contoller?
//pass the value to sql
var queryString = "INSERT INTO " + table;

queryString += " (";
queryString += cols.toString();
queryString += ") ";
queryString += "VALUES (";
queryString += questionMarks(vals.length);
queryString += ") ";

console.log(queryString);

connection.query(queryString, vals, function(err, result){
  if(err){
    throw err;
  }

  cb(result);
});

},

updateOne: function(table, param, new_value, key_name, key_value, cb) {
  var query = "UPDATE ";
  query += table;
  query += " SET ";
  query += param;
  query += " = ";
  query += new_value;
  query += " WHERE ";
  query += key_name;
  query += " = ";
  query += key_value;
  query += ";";
  // console.log(query);
  connection.query(query, function(err, result) {
    cb(result);
  });
}

// removeFromTable: function(table, condition, cb){
//   let queryString = "DELETE FROM ?? WHERE id = ?;";
//   connection.query(queryString, [table, condition], (err, result)=> {
//     if (err){
//       throw err;
//     }
//
//     cb(result);
//   });
// }


};

module.exports = orm;
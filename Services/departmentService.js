const { connect } = require("../connection");
const connection = require("../connection");

module.exports = function() {
    return {
        add: function(department){
            const query = "INSERT INTO departments(departmentName) VALUES(?)";
            return new Promise(function(resolve, reject){
                connection.query(query, [department.departmentName], function(err, results){
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                })
            });
        },
        
        getAll: function() {
            const query = "SELECT * FROM departments";
            return new Promise(function(resolve, reject){
                connection.query(query, function(err, results){
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                })
            })
        },
        
        update: function(){
        
        },

        checkLength : function() {
            const query = "SELECT COUNT(id) AS count FROM departments;";
            return new Promise(function(resolve, reject) {
                connection.query(query, function(err, results) {
                    if(err) {
                        reject(err);
                    }
                    else {
                        var tableLength = results[0].count;
                        // console.log("departmentService");
                        // console.log(results[0].count);
                        // console.log(tableLength);
                        resolve(tableLength);
                        // console.log("end departmentService");
                    }
                });
            });
        }
    }
}
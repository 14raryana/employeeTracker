const connection = require("../connection");

module.exports = function(){
    return {
        add: function(role){
            const query = "INSERT INTO roles (title, salary, department_id) VALUES(?, ?, ?);";
            return new Promise(function(resolve, reject){
                connection.query(query, [role.roleTitle, role.salary, role.selectedDept], function(err, results){
                    if (err) {
                        reject(err);
                    } else {
                        console.log("Successfully added " + role.roleTitle + " as a role");
                        resolve(results);
                    }
                })
            });
        },
    
        getAll: function() {
            const query = "SELECT * FROM roles";
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
            const query = "SELECT COUNT(id) AS count FROM roles;";
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


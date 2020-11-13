const connection = require("../connection");

module.exports = function(){
    return {
        add: function(role){
            const query = "INSERT INTO roles (title, salary, department_id) VALUES(?, ?, ?);";
            return new Promise(function(resolve, reject){
                connection.query(query, [role.roleTitle, role.salary, role.departmentId], function(err, results){
                    if (err) {
                        reject(err);
                    } else {
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
    
        }
    }
}


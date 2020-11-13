const connection = require("../connection");

module.exports = function() {
    return {
        add: function(employee){
            const query = "INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)";
            return new Promise(function(resolve, reject){
                connection.query(query, [employee.firstName, employee.lastName, employee.roleId, employee.managerId], function(err, results){
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                })
            });
        },
        
        getAll: function() {
            const query = "SELECT * FROM employees";
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
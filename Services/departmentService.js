const inquirer = require("inquirer");
const { connect } = require("../connection");
const connection = require("../connection");

var departmentNames = [];

var questions = [
    {
        type: "list",
        name: "deptNames",
        message: "Select One",
        choices: departmentNames
    }
]


module.exports = function() {
    return {
        add: function(department){
            const query = "INSERT INTO departments(departmentName) VALUES(?)";
            return new Promise(function(resolve, reject){
                connection.query(query, [department.departmentName], function(err, results){
                    if (err) {
                        reject(err);
                    } else {
                        console.log("Successfully added " + department.departmentName + " as a department");
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

        getAllDeptNames: function() {
            const query = "SELECT departmentName FROM departments;";
            return new Promise(function(resolve, reject) {
                connection.query(query, function(err, results) {
                    if(err) {
                        reject(err);
                    }
                    else {
                        var deptNames = [];
                        for(var i = 0; i < results.length; i++) {
                            deptNames.push(results[i].departmentName);
                        }
                        resolve(deptNames);
                    }
                });
            });
            // return new Promise(function(resolve, reject){
            //     this.getAll().then(function(result){
                    var deptNames = [];
                    for(var i = 0; i < result.length; i++) {
                        deptNames.push(result[i].departmentName);
                    }
            //         resolve(deptNames);
            //     }).catch(function(error){
            //         reject(error);
            //     })
            // })

         
            //return deptNames;

            // this.getAll().then(function(response) {
            //     var deptNames = [];
            //     for(var i = 0; i < response.length; i++) {
            //         deptNames.push(response[i].departmentName);
            //     }
            //     return deptNames;
            // });
            // const query = "SELECT departmentName FROM departments;";
            // return new Promise(function(resolve, reject) {
            //     connection.query(query, function(err, results) {
            //         if(err) {
            //             reject(err);
            //         }
            //         else {
            //             for(var i = 0; i < results.length; i++) {
            //                 var departmentName = results[i].departmentName;
            //                 departmentNames.push(departmentName);
            //             }
            //             // console.log(departmentNames);
            //             // inquirer.prompt(questions);
            //             resolve(departmentNames);
            //         }
            //     });
            // });
        },
        
        update: function(department){
            console.log(department);
            const query = "UPDATE departments SET departmentName = ? WHERE id = ?;";
            return new Promise(function(resolve, reject) {
                connection.query(query,[department.departmentName, department.id], function(err, results) {
                    if(err) {
                        reject(err);
                    }
                    else {
                        console.log("Successfully updated " + department.departmentName);
                        resolve(results);
                    }
                });
            });            
        },

        tableLength : function() {
            const query = "SELECT COUNT(id) AS count FROM departments;";
            return new Promise(function(resolve, reject) {
                connection.query(query, function(err, results) {
                    if(err) {
                        reject(err);
                    }
                    else {
                        //var tableLength = results[0].count;
                        // console.log("departmentService");
                        // console.log(results[0].count);
                        // console.log(tableLength);
                        resolve(results[0].count);
                        // console.log("end departmentService");
                    }
                });
            });
        }
    }
}

// function Promise(func){


// }

// function resolve(){

// }

// function reject(){

// }

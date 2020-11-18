const inquirer = require("inquirer");
const connection = require("./connection");
const cTable = require("console.table");
// const { connect } = require("./connection");
const employee = require("./Services/employeeService")();
const department = require("./Services/departmentService")();
const role = require("./Services/roleService")();
const questions = require("./Questions");
const { departmentQuestions } = require("./Questions");
const departmentService = require("./Services/departmentService");


function selectedTable() {

}

function mainMenu(){
    // console.clear();
    var menuOption;
    var table;
    
    inquirer.prompt(questions.mainMenuOptions).then(function(answer){
        menuOption = answer.menuOption;
        switch(menuOption) {
            case "Exit" :
                console.log("Goodbye");
                connection.end();
                break;
            case "Add to the database" :
                add();
                break;
            
            case "View the tables of the database" :
                view();
                break;

            case "Update existing information in the database" :
                update();
                break;
        }






        // if(menuOption === "Exit") {
        //     console.log("Goodbye!")
        //     connection.end();
        // }
    //     else {
    //     inquirer.prompt(questions.tableList).then(function(answer){
    //         // console.log("Main Menu Answer");
    //         // console.log(answer);
    //         table = String(answer.selectedTable).toLowerCase();
    //         switch(table) {                    
    //             case "main menu" :
    //                 mainMenu();
    //                 break;
    //             case "roles" :
    //                 department.checkLength().then(function(departmentLength) {
    //                 if(departmentLength <= 0) {
    //                     console.log("There are no Departments");
    //                     console.log("\n");
    //                     inquirer.prompt([
    //                         {
    //                             type: "confirm",
    //                             name: "missingDept",
    //                             message: "Would you like to add a department"
    //                         }
    //                     ]).then(function(answer) {
    //                         if(!answer.missingDept) {
    //                             console.log("You need at least 1 department to add a role");
    //                             endMenu();
    //                         }
    //                         else {
    //                             table = "departments";
    //                             add(table);
    //                         }
    //                     })
    //                 }
    //                 });
    //         }




    //     //     if(table == "roles") {
    //     //         department.checkLength()
    //     //     }
    //     //     if(table === "main menu") {
    //     //         mainMenu();
    //     //     }
    //     //     else {
    //     //     switch(menuOption) {
    //     //         case "Add to the database" :
    //     //             add(table);
    //     //             break;
    //     //         case "View the tables of the database" :
    //     //             view(table);
    //     //             break;
    //     //         case "Update existing information in the database" :
    //     //             update(table);
    //     //             break;

    //     //         // case "Exit" :
    //     //         //     connection.end();
    //     //         //     break;
    //     //     }
    //     // }
    //     });
    // }
    });
}



function view(){
    selectTable().then(function(answer) {
        switch(answer.selectedTable) {
            case "Departments" :
                department.getAll().then(function(departments) {
                    console.table(departments);
                }).then(endMenu);
                break;

            case "Roles" :
                role.getAll().then(function(roles) {
                    console.table(roles);
                }).then(endMenu);
                break;

            case "Employees" :
                employee.getAll().then(function(employees) {
                    console.table(employees);
                }).then(endMenu);
                break;

            case "Main Menu" :
                mainMenu();
                break;
        }
    });

    // switch(tableName) {
    //     case "employees" :
    //         employee.getAll().then(function(employees) {
    //             console.table(employees);
    //             endMenu();
    //         });
    //         break;

    //     case "departments" :
    //         department.checkLength().then(function(tableLength) {
    //             department.getAll().then(function(departments) {
    //                 // console.log(departments.length);
    //                 // console.log(Object.values(departments[0]));
    //                 // var tableData = Object.values(departments);
    //                 // console.log(tableData);
    //                 // await createTable(departments);
    //                 console.log("\n");
    //                 // const table = cTable.getTable("Departments",departments);
    //                 console.table("Departments", departments);
    //                 // console.table(departments);
    //                 if(tableLength <= 0) {
    //                     console.log("There are no Departments");
    //                 }
    //                 // console.log("\r\x1b[K");
    //                 endMenu();
    //             });
    //         });
    //         // department.getAll().then(function(departments) {
    //         //     console.table(departments);
    //         //     if(tableLength <= 0) {
    //         //         console.log("There are no Departments");
    //         //     }
    //         //     endMenu();
    //         // });
    //         break;
    //     case "roles" :
    //         role.getAll().then(function(roles) {
    //             console.table(roles);
    //             endMenu();
    //         });
    //         break;
    // }
}

function getQuestionsFor(tableName){
    // tableName = String().toLowerCase();
    switch(tableName) {
        case "departments" :
            return questions.departmentQuestions;
        case "roles" :
            return questions.roleQuestions;
        case "employees" :
            return questions.employeeQuestions;
    }
}


function add(selectedTable){
    selectTable().then(function(tableName) {
        switch(tableName.selectedTable) {
            case "Departments" :
                addDept();
                break;

            case "Roles" :
                addRole();
                break;

            case "Employees" :
                addEmployee();
                break;

            case "Main Menu" :
                mainMenu();
                break;
        }
    });

    //last thing changed

    // console.log(selectedTable);
    // if(selectedTable) {
    //     console.log("table has been selected");
    //     console.log(selectedTable);
    //     inquirer.prompt(getQuestionsFor(selectedTable)).then(function(answers) {
    //         switch(selectedTable) {
    //             case "departments" :
    //                 department.add(answers);
    //                 break;

    //             case "roles" :
    //                 role.add(answers);
    //                 break;

    //             case "employees" :
    //                 employee.add(answers);
    //                 break;
    //         }
    //         // console.log(answers);
    //         // department.add(answers);
    //         // console.log("Successfully added " + answers.departmentName + " as a department");
    //     });
    // }
//     else{
//         console.log("No table selected");

//     inquirer.prompt(questions.tableList).then(function(answer) {
//         var selectedTable = String(answer.selectedTable).toLowerCase();
//         switch(selectedTable) {
//             case "departments" :
//                 var service = "department";
//                 inquirer.prompt(questions.departmentQuestions).then(function(answers) {
//                     department.add(answers);
//                     console.log("Successfully added " + answers.departmentName + " as a department");
//                 });
//                 break;

//             case "roles" :
//                 var service = "role";
//                 checkTableLength(selectedTable);
//                 //last thing changed
//                 // console.log(checkTableLength(selectedTable) == 0);
//                 // console.log(checkTableLength(selectedTable));
//                 // if(checkTableLength(selectedTable) <= 0) {
//                     // console.log("No Departments found; department required to add role");
//                     // inquirer.prompt([
//                     //     {
//                     //         type: "confirm",
//                     //         name: "missingDept",
//                     //         message: "No departments found, would you like to add a department? (at least 1 department required to add role"
//                     //     }
//                     // ])
//                 // }
//                 // else {
//                 //     console.log("Role added Successfully");
//                 // }
//                 // .then(function(tableLength) {
//                 //     if(tableLength <= 0) {
//                 //     }
//                 //     else {
//                 //     }
//                 // });
//                 break;

//             case "employees" :
//                 var service = "employee";
//                 checkTableLength(selectedTable);
//                 break;
//         }
//     });
// }
    // department.checkLength().then(function(answer) {
        // var tableLength = answer;
        // if(tableLength <= 0) {
        //     console.log("There are no departments");
        //     console.log("\n");
        //     inquirer.prompt([
        //         {
        //             type: "confirm",
        //             name: "missingDept",
        //             message: "Would you like to add a department"
        //         }
        //     ]).then(function(answer) {
        //         if(!answer.missingDept) {
        //             mainMenu();
        //         }
        //     });
        // }
        // else {




            // inquirer.prompt(getQuestionsFor(tableName)).then(function(answers) {
        
            //     switch(tableName) {
            //         case "departments" :
            //             department.add(answers).then(function(){
            //                 console.log("Successfully added " + answers.departmentName + " as a department");
            //                 // console.log(tableLength);
            //                 endMenu();
            //             });//department.add then function
        
            //             break;
            //         case "roles" :
            //             role.add(answers).then(function(){
            //                 console.log("Successfully added " + answers.roleTitle + " as a role");
            //             }); //role.add then function
            //             break;
            //         case "employees" :
            //             employee.add(answers).then(function(){
            //                 console.log("Successfully added " + answers.firstName + " " + answers.lastName + " as an employee");
            //             }); //employee.add then function
            //             break;
            //     }
            // }); 





        // } //else
    // }); //department.checkLength then function
    
    // var temp = getRightTHing(tableName);
//     else {
//     inquirer.prompt(getQuestionsFor(tableName)).then(function(answers) {
//         // console.log(answers);

//         switch(tableName) {
//             case "departments" :
//                 department.add(answers).then(function(){
//                     console.log("Successfully added " + answers.departmentName + " as a department");
//                     console.log(tableLength);
//                     endMenu();
//                 });//department.add then function

//                 break;
//             case "roles" :
//                 role.add(answers).then(function(){
//                     console.log("Successfully added " + answers.roleTitle + " as a role");
//                 }); //role.add then function
//                 break;
//             case "employees" :
//                 employee.add(answers).then(function(){
//                     console.log("Successfully added " + answers.firstName + " " + answers.lastName + " as an employee");
//                 }); //employee.add then function
//                 break;
//         }
//     }); 
// } //else
}
//last thing i changed
async function addDept(isAddingRole, isAddingEmployee) {
    // console.log(isAddingEmployee);
    if(isAddingRole && !isAddingEmployee){
        inquirer.prompt(questions.departmentQuestions).then(function(departmentName) {
            department.add(departmentName).then(addRole);
        })
        // .then(addRole);
    }
    else if(isAddingRole && isAddingEmployee) {
        inquirer.prompt(questions.departmentQuestions).then(function(departmentName) {
            department.add(departmentName).then(addRole(true));
        })
        // .then(addRole(true));
    }
    else {
        inquirer.prompt(questions.departmentQuestions).then(function(departmentName){
            department.add(departmentName).then(endMenu());
        });
    }

    // inquirer.prompt(questions.departmentQuestions).then(function(departmentName) {
    //     department.add(departmentName);
    // });

    // if(repeatAddRole) {
    //     addRole();
    // }
}

async function addRole(isAddingEmployee) {
    // console.log(isAddingEmployee);
    // if(isAddingEmployee) {
    //     return await inquirer.prompt(questions.roleQuestions);
    // }
    // else {
    department.getAll().then(function(departments) {
            if(departments.length <= 0) {
                console.log("No departments found; must have at least 1 department to add a role");
                addDept(true, true);
            }


        // if(departments.length <= 0) {
        //     console.log("No departments found; must have at least 1 department to add a role");
        //     addDept(true).then(function(newDept){
        //         department.add(newDept).then(function(dept){
        //             console.log(dept);
        //             let departmentId = dept.insertId;
        //             let roleQuestions = [questions.roleQuestions[0], questions.roleQuestions[1]];
        //             inquirer.prompt(roleQuestions).then(function(roleAnswers) {
        //                 var roleInfo = roleAnswers;
        //                 roleInfo.departmentId = departmentId;
        //                 role.add(roleInfo).then(function(response) {
        //                     console.log(response);
        //                 });
        //             });
        //         })
               
        //     });
        // }

        else {
            var roleQuestions = questions.roleQuestions;
            var departmentNames = [];
            for(var i = 0; i < departments.length; i++) {
                departmentNames.push(departments[i].departmentName);
            }
            roleQuestions[2].choices = departmentNames;
            inquirer.prompt(roleQuestions).then(function(roleInfo) {
                // var departmentName = roleInfo.departmentId;
                // for(var i = 0; i < departments.length; i++) {
                //     if(departments)
                // }
                // console.log(roleInfo);
                // console.log(departments);
                for(var i = 0; i < departments.length; i++) {
                    if(departments[i].departmentName === roleInfo.selectedDept) {
                        roleInfo.selectedDept = departments[i].id;
                        // console.log(roleInfo.selectedDept);
                        break;
                    }
                }
                if(isAddingEmployee) {
                    role.add(roleInfo).then(addEmployee);
                }
                else {
                    role.add(roleInfo).then(endMenu);
                }
            });
        }
    });
// }
}

function addEmployee() {
    role.getAll().then(function(roles) {
        if(roles.length <= 0) {
            console.log("No roles found; must have at least 1 role to add an employee");
            addRole(true);
            // .then(function(newDept){
            //     department.add(newDept).then(function(dept){
            //         console.log(dept);
            //         let departmentId = dept.insertId;
            //         let roleQuestions = [questions.roleQuestions[0], questions.roleQuestions[1]];
            //         inquirer.prompt(roleQuestions).then(function(roleAnswers) {
            //             var roleInfo = roleAnswers;
            //             roleInfo.departmentId = departmentId;
            //             role.add(roleInfo).then(function(response) {
            //                 console.log(response);
            //             });
            //         });
            //     })
               
            // });
        }
        else {
            var employeeQuestions = questions.employeeQuestions;
            var roleTitles = [];
            for(var i = 0; i < roles.length; i++) {
                roleTitles.push(roles[i].title);
            }
            employeeQuestions[2].choices = roleTitles;
            // employeeQuestions[2].choices = 
            inquirer.prompt(employeeQuestions).then(function(employeeInfo) {
                for(var i = 0; i < roles.length; i++) {
                    if(employeeInfo.roleId == roles[i].title) {
                        employeeInfo.roleId = roles[i].id;
                        employee.add(employeeInfo).then(endMenu);
                    }
                }
                // console.log(roles);
                // for(var i = 0; i < roles.length; i++) {
                //     if(employeeInfo.)
                // }
                // employee.add(employeeInfo);
                // console.log(employeeInfo);
            });
        }
    })
}



function update(){
    selectTable().then(function(tableName) {
        switch(tableName.selectedTable) {
            case "Departments" :
                department.getAll().then(function(departments) {
                    // console.log(departments);
                    var selectDepartment = questions.selectDepartment[0];
                    selectDepartment.choices = departments.map((department) => department.departmentName);
                    inquirer.prompt(selectDepartment).then(function(selectedDepartment) {
                        var departmentBeingUpdated = departments.filter((department) => department.departmentName == selectedDepartment.selectedDept)[0];
                        inquirer.prompt(questions.updateDeptQuestions).then(function(updatedDept) {
                            // console.log(departmentBeingUpdated);
                            departmentBeingUpdated.departmentName = updatedDept.updatedDeptName;
                            department.update(departmentBeingUpdated).then(endMenu);
                        });
                    });
                });
                break;

            case "Roles" :
                console.log("Updating roles has not been added yet \nComing Soon...");
                endMenu();
                // role.getAll().then(function(roles) {
                //     var selectRole = questions.selectRole[0];
                //     selectRole.choices = roles.map((role) => role.title);
                //     // console.log(selectRole);
                //     inquirer.prompt(selectRole).then(function(selectedRole) {
                //         department.getAll().then(function(departments) {
                //             var departmentNames = departments.map(function(department) {
                //                 return department.departmentName;
                //             });
                //             var updateRoleQuestions = questions.updateRoleQuestions;
                //             updateRoleQuestions[2].choices = departmentNames;
                //             inquirer.prompt(updateRoleQuestions).then(function(updatedRole) {
                //                 console.log(updatedRole);
                //             });
                //         })
                //     });
                // });
                break;

            case "Employees" :
                employee.getAll().then(function(employees) {
                    var employeeNames = employees.map(function(employee) {
                        var employeeName = employee.first_name + " " + employee.last_name;
                        return employeeName;
                    });
                    var selectEmployee = questions.selectEmployee[0];
                    selectEmployee.choices = employeeNames;
                    inquirer.prompt(selectEmployee).then(function(selectedEmployee) {
                        role.getAll().then(function(roles) {
                            var roleNames = roles.map(function(role) {
                                return role.title;
                            });
                            var roleQuestions = questions.selectRole[0];
                            roleQuestions.choices = roleNames;
                            inquirer.prompt(roleQuestions).then(function(selectedRole) {
                                var role = roles.filter(function(role) {
                                    return selectedRole.selectedRole == role.title;
                                });
                                var emp = employees.filter(function(employee) {
                                    return selectedEmployee.selectedEmployee == (employee.first_name + " " + employee.last_name);
                                });
                                emp[0].role_id = role[0].id;
                                employee.update(emp[0]).then(function(response) {
                                    // console.log(response);
                                });
                            });
                        });

                    });
                });
                break;

            case "Main Menu" :
                mainMenu();
                break;
        }
    });
}

// function init() {
//     inquirer.prompt(mainMenuOptions).then(function(answer) {
//         var menuOption = answer.menuOption;
//         inquirer.prompt(tableList).then(function(ans) {
//             var dataToWorkWith = ans.selectedTable;
//             switch(menuOption) {
//                 case "Add to the database"  :
//                     switch(dataToWorkWith) {
//                         case "Departments" :
//                             addDepartment();
//                             break;

//                         case "Roles" :
//                             addRole();
//                             break;

//                         case "Employees" :
//                             addEmployee();
//                             break;
//                     }
//                 case "View the tables of the database" :
//                     switch(dataToWorkWith) {
//                         case "Departments" :
//                             viewDepartment();
//                             break;

//                         case "Roles" :
//                             viewRoles();
//                             break;

//                         case "Employees" :
//                             viewEmployees();
//                             break;
//                     }

//                 case "Update existing information in the database" :
//                     switch(dataToWorkWith) {
//                         case "Departments" :
//                             // functionName();
//                             break;

//                         case "Roles" :
//                             updateRole();
//                             break;

//                         case "Employees" :
//                             // functionName();
//                             break;
//                     }
//             }
//             // if(objective == "Add to the database" && dataToWorkWith == "Departments") {
//             //     addDepartment();
//             // }
//         });




//         // switch(answer.objective) {
//         //     case "Add to the database" :
//         //         chooseData();
//         //         break;
            
//         //     case "View the tables of the database" :
//         //         // functionName();
//         //         break;

//         //     case "Update existing information in the database" :
//         //         // functionName();
//         //         break;

//         //     case "Exit" :
//         //         connection.end();
//         // }
//     });
// }

async function selectTable() {
    return await inquirer.prompt(questions.tableList);
    // .then(function(answer) {
        // return answer.selectedTable;
        // switch(answer.selectedTable) {
        //     case "Departments" :
        //         addDepartment();
        //         break;

        //     case "Roles" :
        //         addRole();
        //         break;

        //     case "Employees" :
        //         addEmployee();
        //         break;

        //     case "Go Back (NOT A TABLE)" :
        //         init();
        //         break;
        // }
    // });
}

// function addDepartment() {
//     inquirer.prompt(departmentQuestions).then(function(answer) {
//         // var query = "USE employeeTracker_db;";
//         var query = "INSERT INTO department (departmentName) VALUES(?);";
        
//         connection.query(query, [answer.departmentName], function(err, response) {
//             if(err) throw err;
//             console.log("Successfully added " + answer.departmentName + " as a department");
//         });
//     });
// }

// function addRole() {
//     inquirer.prompt(roleQuestions).then(function(answer) {
//         var query = "INSERT INTO role (title, salary, department_id)";
//         query += "VALUES(?,?,?);";

//         connection.query(query, [answer.roleTitle, answer.salary, answer.departmentId], function(err, response) {
//             if(err) throw err;
//             console.log("Successfully added " + answer.roleTitle + " as a role");
//         });
//     });
// }

// function addEmployee() {
//     inquirer.prompt(employeeQuestions).then(function(answer) {
//         var query = "INSERT INTO employee(first_name, last_name, role_id, manager_id)";
//         query += "VALUES(?, ?, ?, ?);";

//         connection.query(query, [answer.firstName, answer.lastName, answer.roleId, answer.managerId], function(err, response) {
//             if(err) throw err;
//             console.log("Successfully added " + answer.firstName + " " + answer.lastName + " as an employee");
//         });
//     });
// }

// function viewDepartment() {
//     var query = "SELECT * FROM departments";
    
//     connection.query(query, function(err, response) {
//         if(err) throw err;
//         console.table(response);
//         console.log("This is the department table");
//     });
// }

// function viewRoles() {
//     getAllRoles()
//     .then((result) => {
//         console.table(result);
//     }).catch((err) => {
//         console.log(err);
//     })
//     var query = "SELECT * FROM role";

//     connection.query(query, function(err, response) {
//         if(err) throw err;
//         console.log(`\n ${response}`);
//         console.table(response);
//         // console.log("This is the roles table");
//         // resolve(response);
//     });
// }

// function viewEmployees() {
//     var query = "SELECT * FROM employee";

//     connection.query(query, function(err, result) {
//         if(err) throw err;
//         console.table(result);
//         console.log("This is the employees table");
//     });
// }

function getAllRoles(){
    return new Promise(function (resolve, reject) {
        const query = "SELECT * FROM role";
        connection.query(query, function(err, results) {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

// function displayTable(data){
//     console.table(data);
// }

function updateRole() {
    var table = getAllRoles();
    // console.log(table);
    inquirer.prompt(viewTable).then(function(answer) {

        // if(answer.viewTable) {

        // }

        if(answer.viewTable) {

            getAllRoles()
            .then(function(result) {
                console.table(result);
            }).catch(function(err) {
                // console.log(err);
            });
            // viewRoles();
            // console.log("after viewRoles");
        }
    }).then(function(response) {

        // console.log("then");
        // inquirer.prompt(updateQuestions).then(function(ans) {
        //     var query = "UPDATE role ";
        //     query += "SET ?? ";
        //     query += "WHERE id = ?;";
        //     connection.query(query, [ans.colName, ans.rowId], function(err, response) {
        //         if(err) throw err;
        //         viewRoles();
        //     });
        // });
    });
}

function endMenu() {
    console.log("\n");
    inquirer.prompt(questions.endMenuOptions).then(function(answer) {
        switch(answer.selectedOption) {
            case "Main Menu" :
                mainMenu();
                break;

            case "Exit" :
                console.log("Goodbye!");
                connection.end();
        }
    });
}

function checkTableLength(selectedTable) {
    switch(selectedTable) {
    }


    // switch(selectedTable) {
    //     case "roles" :
    //             department.checkLength().then(function(tableLength) {
    //                 if(tableLength <= 0) {
    //                     console.log("There are no departments; at least 1 department required to add a role");
    //                     inquirer.prompt([
    //                         {
    //                             type: "confirm",
    //                             name: "missingDept",
    //                             message: "Would you like to add a department?"
    //                         }
    //                     ]).then(function(answer) {
    //                         if(answer.missingDept) {
    //                             var selectedTable = "departments"
    //                             add(selectedTable);
    //                         }
    //                         else {
    //                             console.log("No Departments found; restarting Program...");
    //                             mainMenu();
    //                         }
    //                     });
    //                 }
    //                 // else {
    //                 //     console.log("Table length is greater than 0");
    //                 // }
    //             });

    //     case "employees" :
    //         role.checkLength().then(function(tableLength) {
    //             if(tableLength <= 0) {
    //                 console.log("No roles found; at least 1 role required to add an employee");
    //                 inquirer.prompt([
    //                     {
    //                         type: "confirm",
    //                         name: "missingRole",
    //                         message: "Would you like to add a role?"
    //                     }
    //                 ]).then(function(answer) {
    //                     if(answer.missingRole) {
    //                         var selectedTable = "roles";
    //                         add(selectedTable);
    //                     }
    //                     else {
    //                         console.log("No Roles found; restarting Program");
    //                         mainMenu();
    //                     }
    //                 })
    //             }
    //             else {
    //                 console.log("Roles have been found");
    //             }
    //         });
    //         break;
    // }
}

// function updateEmployee() {

// }

// function createTable(tableName) {
//     var tableLength = tableName.length;
//     for(var i = 0; i < tableLength; i++) {
//         var tableValues = Object.values(tableName);
//     }
// }

function test() {
    department.getAll().then(function(departments) {
        var deptNames = [];
        for(var i = 0; i < departments.length; i++) {
            deptNames.push(departments[i].departmentName);
        }
        var selectDeptQuestions = questions.selectDepartment[0];
        selectDeptQuestions.choices = deptNames;
        inquirer.prompt(selectDeptQuestions).then(function(selectedDept) {
            var departmentName = selectedDept.selectedDept;
            var departmentId;
            for(var i = 0; i < departments.length; i++) {
                if(departments[i].departmentName === departmentName) {
                    console.log("")
                    departmentId = departments[i].id;
                    break;
                }
            }
            // console.log(departmentId);
        });
    });








    // department.getAllDeptNames().then(function(result){

    //     var selectDeptQuestions = questions.selectDepartment[0];
    //     // console.log(selectDeptQuestions.choices);
    //     selectDeptQuestions.choices = result;
    //     // console.log(selectDeptQuestions.choices);
    //     inquirer.prompt(selectDeptQuestions); 

    // }).catch(function(error){
    //     console.log(error);
    // })
    // department.displayAll();
    //console.log(department.displayAll());
        // inquirer.prompt(questions.selectDepartment);
        // console.log(questions.selectDepartment.choices);
        // var question = questions.selectDepartment;
        // questions.selectDepartment.choices = departmentNames;
        // inquirer.prompt(questions.selectDepartment)
        // var deptNames = departmentNames;
        // console.log(deptNames);
        // module.exports = deptNames;
        // inquirer.prompt(questions.selectDepartment).then(function(answer) {
        //     // console.log(answer);
        // });
}

// var deptNames = [];
// module.exports = deptNames;


mainMenu();
const inquirer = require("inquirer");
const connection = require("./connection");
// const cTable = require("console.table");
// const { connect } = require("./connection");
const employee = require("./Services/employeeService")();
const department = require("./Services/departmentService")();
const role = require("./Services/roleService")();
const questions = require("./Questions");

function mainMenu(){
    console.clear();
    var menuOption;
    var table;
    
    inquirer.prompt(questions.mainMenuOptions).then(function(answer){
        menuOption = answer.menuOption;
        if(menuOption === "Exit") {
            console.log("Goodbye!")
            connection.end();
        }
        else {
        inquirer.prompt(questions.tableList).then(function(answer){
            table = String(answer.selectedTable).toLowerCase();
            switch(menuOption) {
                case "Add to the database" :
                    add(table);
                    break;
                case "View the tables of the database" :
                    view(table);
                    break;
                case "Update existing information in the database" :
                    update(table);
                    break;

                // case "Exit" :
                //     connection.end();
                //     break;
            }
        });
    }
    });
}



function view(tableName){
    switch(tableName) {
        case "employees" :
            employee.getAll().then(function(employees) {
                console.table(employees);
                endMenu();
            });
            break;

        case "departments" :
            department.checkLength().then(function(tableLength) {
                department.getAll().then(function(departments) {
                    // console.log(departments.length);
                    // console.log(Object.values(departments[0]));
                    // var tableData = Object.values(departments);
                    // console.log(tableData);
                    // await createTable(departments);
                    console.log("\n");
                    // const table = cTable.getTable("Departments",departments);
                    console.table("Departments", departments);
                    // console.table(departments);
                    if(tableLength <= 0) {
                        console.log("There are no Departments");
                    }
                    // console.log("\r\x1b[K");
                    endMenu();
                });
            });
            // department.getAll().then(function(departments) {
            //     console.table(departments);
            //     if(tableLength <= 0) {
            //         console.log("There are no Departments");
            //     }
            //     endMenu();
            // });
            break;
        case "roles" :
            role.getAll().then(function(roles) {
                console.table(roles);
                endMenu();
            });
            break;
    }
}

function getQuestionsFor(tableName){
    switch(tableName) {
        case "departments" :
            return questions.departmentQuestions;
        case "roles" :
            return questions.roleQuestions;
        case "employees" :
            return questions.employeeQuestions;
    }
}


function add(tableName){
    department.checkLength().then(function(answer) {
        var tableLength = answer;
        if(tableLength <= 0) {
            console.log("There are no departments");
            console.log("\n");
            inquirer.prompt([
                {
                    type: "confirm",
                    name: "missingDept",
                    message: "Would you like to add a department"
                }
            ]);
        }
        else {
            inquirer.prompt(getQuestionsFor(tableName)).then(function(answers) {
        
                switch(tableName) {
                    case "departments" :
                        department.add(answers).then(function(){
                            console.log("Successfully added " + answers.departmentName + " as a department");
                            // console.log(tableLength);
                            endMenu();
                        });//department.add then function
        
                        break;
                    case "roles" :
                        role.add(answers).then(function(){
                            console.log("Successfully added " + answers.roleTitle + " as a role");
                        }); //role.add then function
                        break;
                    case "employees" :
                        employee.add(answers).then(function(){
                            console.log("Successfully added " + answers.firstName + " " + answers.lastName + " as an employee");
                        }); //employee.add then function
                        break;
                }
            }); 
        } //else
    })
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

function update(tableName){

 
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

// function chooseData() {
//     inquirer.prompt(tableList).then(function(answer) {
//         switch(answer.selectedTable) {
//             case "Departments" :
//                 addDepartment();
//                 break;

//             case "Roles" :
//                 addRole();
//                 break;

//             case "Employees" :
//                 addEmployee();
//                 break;

//             case "Go Back (NOT A TABLE)" :
//                 init();
//                 break;
//         }
//     });
// }

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
    console.log(table);
    inquirer.prompt(viewTable).then(function(answer) {

        // if(answer.viewTable) {

        // }

        if(answer.viewTable) {

            getAllRoles()
            .then(function(result) {
                console.table(result);
            }).catch(function(err) {
                console.log(err);
            });
            // viewRoles();
            // console.log("after viewRoles");
        }
    }).then(function(response) {

        console.log("then");
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

// function updateEmployee() {

// }

// function createTable(tableName) {
//     var tableLength = tableName.length;
//     for(var i = 0; i < tableLength; i++) {
//         var tableValues = Object.values(tableName);
//     }
// }

mainMenu();
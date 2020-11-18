const inquirer = require("inquirer");
const connection = require("./connection");
const cTable = require("console.table");
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


}

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
}

async function addRole(isAddingEmployee) {
    department.getAll().then(function(departments) {
            if(departments.length <= 0) {
                console.log("No departments found; must have at least 1 department to add a role");
                addDept(true, true);
            }

        else {
            var roleQuestions = questions.roleQuestions;
            var departmentNames = [];
            for(var i = 0; i < departments.length; i++) {
                departmentNames.push(departments[i].departmentName);
            }
            roleQuestions[2].choices = departmentNames;
            inquirer.prompt(roleQuestions).then(function(roleInfo) {

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
}

function addEmployee() {
    role.getAll().then(function(roles) {
        if(roles.length <= 0) {
            console.log("No roles found; must have at least 1 role to add an employee");
            addRole(true);
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

async function selectTable() {
    return await inquirer.prompt(questions.tableList);
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
}

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
}


mainMenu();
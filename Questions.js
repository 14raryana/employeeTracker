const departmentService = require("./Services/departmentService");

const questions = {
    // department: {
    //     questions: [

    //     ],
    //     add: function(){

    //         //add the new department
    //     },
    // },
    // employee: {

    // },
    // role: {

    // },
    mainMenuOptions: [
        {
            type: "list",
            name: "menuOption",
            message: "What would you like to do?",
            choices: [
                "Add to the database",
                "View the tables of the database",
                "Update existing information in the database",
                "Exit"
            ]
        }
    ],

    employeeQuestions:[
            {
                type: "input",
                name: "firstName",
                message: "What is the employees' first name?"
            },
            {
                type: "input",
                name: "lastName",
                message: "What is the employees' last name?"
            },
            {
                type: "list",
                name: "roleId",
                message: "Please select a role to add this employee to",
                choices: []
            },
            // {
            //     type: "input",
            //     name: "managerId",
            //     message: "What is the employees' manager's Id?"
            // }
        ],
    departmentQuestions: [
        {
            type: "input",
            name: "departmentName",
            message: "What is the name of the department you would like to add?"
        }
    ],
    roleQuestions: [
        {
            type: "input",
            name: "roleTitle",
            message: "What is the name of the role you would like to add?"
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary of this role?"
        },
        // {
        //     type: "input",
        //     name: "departmentId",
        //     message: "What is the department ID of this role?"
        // },
        {
            type: "list",
            name: "selectedDept",
            message: "Please Select a Department to add this role to",
            choices: []
        }
    ],
    tableList: [
        {
            type: "list",
            name: "selectedTable",
            message: "What table would you like to work with?",
            choices: [
                "Departments",
                "Roles",
                "Employees",
                "Main Menu"
            ]
        }
    ],
    viewTable: [
        {
            type: "confirm",
            name: "viewTable",
            message: "Would you like to see the table you are about to update?"
        }
    ],
    updateQuestions: [
        {
            type: "input",
            name: "colName",
            message: "What would you like to update (please give column names of the data you would like to change)"
        },
        {
            type: "input",
            name: "rowId",
            message: "Which locations would you like to make these changes? (Please give an id that correlates with the id's of the database)"
        }
    ],
    endMenuOptions: [
        {
            type: "list",
            name: "selectedOption",
            message: "What would you like to do next?",
            choices: [
                "Main Menu",
                // "Repeat what you just did",
                // "View a Table",
                "Exit"
            ]
        }
    ],
    selectDepartment: [
        {
            type: "list",
            name: "selectedDept",
            message: "Please Select a Department",
            choices: null
        }
    ],
    selectRole: [
        {
            type: "list",
            name: "selectedRole",
            message: "Please Select a Role",
            choices: []
        }
    ],
    selectEmployee: [
        {
            type: "list",
            name: "selectedEmployee",
            message: "Please Select an Employee",
            choices: []
        }
    ],
    updateDeptQuestions: [
        {
            type: "input",
            name: "updatedDeptName",
            message: "Please enter new Department Name"
        }
    ],
    updateRoleQuestions: [
        {
            type: "input",
            name: "updatedRoleTitle",
            message: "Please enter new Role name"
        },
        {
            type: "input",
            name: "updatedSalary",
            message: "Please enter a new salary for this role"
        },
        // {
        //     type: "input",
        //     name: "departmentId",
        //     message: "What is the department ID of this role?"
        // },
        {
            type: "list",
            name: "selectedDept",
            message: "Please Select a Department to add this role to",
            choices: []
        }
    ],
    updateEmployeeRoleQuestions: [
        {
            type: "list",
            name: "updateEmployeeRole",
            message: "Which employees' role would you like to update?",
            choices: []
        }
    ]
}
function hello() {
    // return ["poop","garb", "shit"];
}

module.exports = questions;
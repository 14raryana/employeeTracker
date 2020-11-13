var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "Localhost",
    port: 3306,
    user: "root",
    password: "rootroot",
    database: "employeeTracker_db"
});

connection.connect(function(err) {
    if(err) throw err;
    // console.log("ERROR YOU FUCKED UP!!!!!!!");
    // mainMenu();
    // init();
});

module.exports = connection;
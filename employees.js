const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
  
    port: 3306,
  
    user: "root",
  
    password: "Rebel91!",
    database: "employees_db"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    start();
  });

function start() {
    inquirer
  .prompt({
      type: "list",
      name: "selection",
      message: "What would you like to do?",
      choices: ["View All Employees", "View Departments", "View Roles", "Add Employee", "Add Department", "Add Role", "Update An Employee"]
  })
  .then(function(answer) {
      switch(answer.selection) {
          case "View All Employees":
              viewEmployees();
              break;
          case "View Departments":
              viewDepartments();
              break;
          case "View Roles":
              viewRoles();
              break;
          case "Add Employee":
              addEmployee();
              break;
          case "Add Department":
              addDepartment();
              break;
          case "Add Role":
              addRole();
              break;
          case "Update An Employee":
              updateEmployee();
              break;
      }
  })
};

function viewEmployees() {
    var query = "SELECT * FROM employee";

    connection.query(query, function(err, res) {
        if (err) throw err;

        console.table(res);

        start();
    });
};

function viewDepartments() {
    var query = "SELECT * FROM department";

    connection.query(query, function(err, res) {
        if(err) throw err;

        console.table(res);

        start();
    });
};

function viewRoles() {
    var query = "SELECT * FROM role";

    connection.query(query, function(err, res) {
        if (err) throw err;

        console.table(res);

        start();
    });
};



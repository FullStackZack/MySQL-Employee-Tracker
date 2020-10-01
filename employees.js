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
      choices: ["View All Employees", "View Departments", "View Roles", "Add Employee", "Add Department", "Add Role", "Update An Employee", "Quit"]
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
          default:
              connection.end();
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

function showAll() {
    var query = "SELECT * FROM employee, role, department";

    connection.query(query, function(err, res) {
        if (err) throw err;

        console.table(res);
    })
}

function addEmployee() {

    var query = "SELECT * FROM employee, role";

    connection.query(query, function(err, res) {
        inquirer
        .prompt([
            {
                name: "first_name",
                type: "input",
                message: "What is the employee's first name?"
            },
            {
                name: "last_name",
                type: "input",
                message: "What is the employee's last name?"
            },
            {
                name: "role_choice",
                type: "rawlist",
                message: "What will be their role?",
                choices: function() {
                    let choiceArr = [];
                    for (let i = 0; i < res.length; i++) {
                        choiceArr.push(res[i].id);
                    }
                    return choiceArr;
                }
            },
            {
                name: "manager_choice",
                type: "rawlist",
                message: "Who will be their manager?",
                choices: function() {
                    let choiceArr = [];
                    for (let i = 0; i < res.length; i++) {
                        choiceArr.push(res[i].manager_id);
                    }
                    return choiceArr;
                }
            }
        ])
        .then(function(answer) {
            
            connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)"
            , [answer.first_name, answer.last_name, answer.role_choice, answer.manager_choice], function(err, data) {
                if(err) throw err;

                console.table("Employee successfully added!");
                showAll();

                start();
            })
        })
    })   
}

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

        console.table(res)

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

function addEmployee() {
    console.log("Adding new employee...\n");

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
          }
      ])
      .then(function(){
          
        var query = "SELECT * FROM role";

        connection.query(query, function(err, res) {
            if(err) throw err;

            inquirer
              .prompt([
                  {
                      name: "role_choice",
                      type: "rawlist",
                      message: "What will their role be?",
                      choices: function() {
                          let choiceArr = [];
                          for (let i = 0; i < res.length; i++) {
                              choiceArr.push(res[i].title)
                          }
                          return choiceArr;
                      }
                  }
              ])
        })
          
      })
}

function addDepartment() {
    console.log("Adding a new department!...\n");

    inquirer
      .prompt([
          {
              name: "nameOfDept",
              type: "input",
              message: "What department do you want to add?"
          }
      ])
      .then(function(answer) {
          console.log(answer);

          var query = connection.query(
              "INSERT INTO department SET ?",
              {
                  name: answer.nameOfDept
              },
              function(err, res) {
                  if(err) throw err;
                  
                  console.log(res.affectedRows + " department added!\n");

                  start();
              }
          )
      })

}

function addRole() {
    console.log("Adding a new role...\n");

    let depts = [];
  
    var query = "SELECT * FROM department";
  
    connection.query(query, function(err, res) {
        if(err) throw err;
  
        for (let i = 0; i < res.length; i++) {
            depts.push({name: res[i].name, value: res[i].id});
        }
  
        inquirer
          .prompt([
              {
                  name: "role_title",
                  type: "input",
                  message: "What role would you like to add?"
              },
              {
                  name: "salary",
                  type: "input",
                  message: "What is the salary for this role?"
              },
              {
                  name: "department",
                  type: "rawlist",
                  message: "What department is this role under?",
                  choices: depts
              }
          ])
          .then(function(answer) {
              console.log(answer);

              var query = connection.query(
                  "INSERT INTO role SET ?",
                  {
                      title: answer.role_title,
                      salary: answer.salary,
                      department_id: answer.department
                  },
                  function(err, res) {
                      if(err) throw err;

                      console.log(res.affectedRows + " role added!\n")

                      start();
                  }
              )
          })
    })
}

function updateEmployee() {
    console.log("Updating a current employee's role!...\n");

}
const mysql = require("mysql");
const inquirer = require("inquirer");

function start() {
    inquirer
  .prompt({
      type: "list",
      name: "selection",
      message: "What would you like to do?",
      choices: ["View All Employees", "View Departments", "View Roles", "Add Employee", "Add Department", "Add Role", "Update An Employee"]
  })
  
}

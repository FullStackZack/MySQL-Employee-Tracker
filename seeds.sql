USE employees_db;

INSERT INTO department (name)
VALUES ("Sales"), ("Engineering"), ("Legal"), ("Finance");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000.00, 1), ("Lead Engineer", 150000.00, 2), ("Legal Team Lead", 250000.00, 3), ("Accountant", 125000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Zack", "White", 1, 1), ("Tom", "Brady", 2, 2), ("Phil", "Loy", 3, 3), ("John", "Wick", 4, 4);
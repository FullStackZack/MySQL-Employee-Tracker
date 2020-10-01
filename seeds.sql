USE employees_db;

INSERT INTO department (name)
VALUES ("Sales"), ("Engineering"), ("Legal"), ("Finance");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Manager", 120000.00, 1), ("Sales Lead", 100000.00, 1), ("Head of Engineering", 220000.00, 2), ("Lead Engineer", 150000.00, 2), ("Legal Operations Manager", 350000.00, 3), ("Legal Team Lead", 250000.00, 3), ("Head of Accounting", 225000.00, 4), ("Accountant", 125000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Zack", "White", 1, NULL), ("Paul", "Viola", 2, 1), ("Tay", "Mai", 3, NULL), ("Tom", "Brown", 4, 2), ("Kesha", "Patel", 5, NULL), ("Chase", "Roberts", 6, 3), ("Timothy", "Williams", 7, NULL), ("Sara", "Collins", 8, 4);
USE employees_db;

INSERT INTO department (name)
VALUES ("Sales"), ("Engineering"), ("Legal"), ("Finance");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Manager", 120000.00, 1), ("Sales Lead", 100000.00, 1), ("Head of Engineering", 220000.00, 2), ("Lead Engineer", 150000.00, 2), ("Legal Operations Manager", 350000.00, 3), ("Legal Team Lead", 250000.00, 3), ("Head of Accounting", 225000.00, 4), ("Accountant", 125000.00, 4);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Zack", "White", 1), ("Paul", "Viola", 2), ("Tay", "Mai", 3), ("Tom", "Brown", 4), ("Kesha", "Patel", 5), ("Chase", "Roberts", 6), ("Timothy", "Williams", 7), ("Sara", "Collins", 8);
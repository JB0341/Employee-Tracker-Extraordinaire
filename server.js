DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;
USE employeeTracker_db;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KeyboardEvent, 
    department_name VARCHAR(300) NOT NULL
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(300) NOT NULL,
    last_name VARCHAR(300) NOT NULL,
    role_id INT NOT NULL
);


CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KeyboardEvent, 
    title VARCHAR(300), 
    salary DECIMAL(10,2),
    department_id INT, 
    FOREIGN KEY (department_id)
    REFERENCES departments(id)
    ON DELETE SET NULL
);
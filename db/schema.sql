CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

CREATE TABLE departments(
	id INT auto_increment NOT NULL,
    departmentName VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE roles(
	id INT auto_increment NOT NULL,
    title VARCHAR(30),
    salary DECIMAL(10,2),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments (id),
    PRIMARY KEY (id)
);

CREATE TABLE employees(
	id INT auto_increment NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES roles (id),
    PRIMARY KEY (id)
);

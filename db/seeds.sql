USE employeeTracker_db;

CREATE TABLE department (
	id INT auto_increment not null,
    departmentName VARCHAR(30),
    primary key (id)
);

CREATE TABLE role (
	id INT auto_increment not null,
    title VARCHAR(30),
    salary DECIMAL(4,2),
    department_id INT,
    primary key (id)
);

CREATE TABLE employee (
	id INT auto_increment not null,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    primary key (id)
);
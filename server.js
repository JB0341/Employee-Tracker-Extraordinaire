const inquirer = require("inquirer");
const mysql = require('mysql2');


const connection = mysql.createConnection({
    host 'localhost',
    port: 3001,
    user: 'postgres',
    password: 'The6th287!',
    database: 'employeeTracker_db',
});

connection.connect((err) => {
    if (err) throw err;
    start();
});


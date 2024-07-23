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

function start() {
    inquirer
        .createPromptModule({
            type: 'list',
            name: 'action',
            message: 'what would you like to do?'
            choices: [
                'View Departments',
                'View Roles',
                'View Employees',
                'Add Department',
                'Add Role',
                'Add Employee',
                'Update Role',
                'Exit',
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case 'View departments':
                    viewDepartments();
                    break;
                case 'View Roles':
                    viewRoles();
                    break;
                case 'View Employees':
                    viewEmployees();
                    break;
                case 'Add Department':
                    addDepartment();
                    break;
                case 'Add Role':
                    addRole();
                    break;
                case 'Add Employee':
                    addEmployee();
                    break;
                case 'Update Employee Role':
                    updateEmployeeRole();
                case 'Exit':
                    connection.end();
                    break;
            }
        });
}
process.on('exit', () => {
    connection.end();
});

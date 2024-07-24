const inquirer = require("inquirer");
const { Pool } = require('pg');


// Connect to database
const pool = new Pool(
    {
        // Enter PostgreSQL username
        user: 'postgres',
        // Enter PostgreSQL password
        password: 'The6th287!',
        host: 'localhost',
        database: 'courses_db'
    },
    console.log('Connected to the courses_db database!')
)

pool.connect();


function start() {
    const prompt = inquirer.createPromptModule();
    prompt({
        type: 'list',
        name: 'action',
        message: 'what would you like to do?',
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
                    process.exit();
            }
        });
}

function viewDepartments() {
    const query = 'SELECT * From departments';
    pool.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
    });
}

function viewRoles() {
    const query = 'SELECT roles.title, roles.id, departments.department_name, roles.salary from roles, join departments on roles.department_id = departments.id';
    pool.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
    });
}

function viewEmployees() {
    const query = `
    SELECT e.id, e.first_name, e.last_name, r.title, d.department_name, r.salary
    FROM employee e
    LEFT JOIN roles r ON e.role_id = r.id
    LEFT JOIN departments d ON r.department_id = d.id
    LEFT JOIN employee m ON e.manager_id = m.id;
    `;
    pool.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
    });
}

function addDepartment() {
    inquirer
        .prompt({
            type: 'input',
            name: 'name',
            message: 'Enter name of new department:',
        })
        .then((answer) => {
            console.log(answer.name);
            const query = `INSERT INTO departments (department_name) VALUES ('${answer.name}')`;
            pool.query(query, (err, res) => {
                if (err) throw err;
                console.log('Added department ${answer.name}.');
            })
    });
}

function addRole() {
    inquirer
        .prompt({
            type: 'input',
            name: 'title',
            message: 'Enter the new role title:',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary of new role:',
        },
        {
            type: 'list',
            name: 'department',
            message: 'Select the department for the role:',
            choices: res.map(
                (department) => department.department_name
            ),
        },
    )
    .then((answers) => {
        const department = res.find(
            (department) => department.name === answers.department
        );
    })
    const query = 'INSERT INTO roles SET ?';
    pool.query(
        query,
        {
            title: answers.title,
            salary: answers.salary,
            department_id: department,
        },
        (err, res) => {
        if (err) throw err;
        console.log('Added role ${answers.title} with salary ${answers.salary} to the ${answers.department} department.');
    });
}

function viewDepartments() {
    const query = 'SELECT * From departments';
    pool.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
    });
}

function viewDepartments() {
    const query = 'SELECT * From departments';
    pool.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
    });
}


process.on('exit', () => {
    pool.end();
});

start();
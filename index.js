const { getAllEmployees, getEmployeeById } = require("./controllers/employees");
const express = require("express");
const cors = require("cors");
const app = express();


app.use(cors());
app.use(express.json());


// home route
app.get('/', (req, res) => {
  res.send(`<h1>This is BD6.6 - CW </h1>`);
});
// Exercise 1: Retrieve All Employees
// Objective: Retrieve all employees from the database.
// Query Parameters: None
// Tasks: Implement a function to return all employees and ensure the correct data format is returned.
app.get('/employees', async (req, res) => {
  const employees = await getAllEmployees();
  res.json({ employees });
});

// Exercise 2: Retrieve Employee by ID
// Objective: Retrieve an employee by their ID from the database.
// Query Parameters: id - The ID of the employee to retrieve.
// Tasks: Implement a function to return an employee based on their ID and ensure the correct data format is returned.
app.get('/employees/details/:id', async (req, res) => {
  const employee = await getEmployeeById(parseInt(req.params.id));
  res.json({ employee });
});


module.exports = { app }

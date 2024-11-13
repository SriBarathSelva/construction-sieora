const EmployeeModel = require('../Models/Employee');
const mongoose = require('mongoose');
const moment = require('moment');

let employee = EmployeeModel;

module.exports = {
    listAllData,
    getSingleData,
    createNewData,
    updateSingleData,
    deleteSingleData,
};

// List all Employees


async function listAllData(req, res) {
    try {
        const allEmployees = await employee.find({});
        
        res.send({ status: true, data: allEmployees });
    } catch (err) {
        console.error(err);
        res.status(500).send({ msg: 'Error retrieving Employees', data: err });
    }
}



// Get a single Employee by ID
async function getSingleData(req, res) {
    const { id } = req.params;
    try {
        const Employee = await employee.findById(id);
        if (Employee) {
            res.status(200).send({ status: true, data: Employee });
        } else {
            res.status(404).send({ status: false, msg: "Employee doesn't exist" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ msg: 'Error retrieving Employee', data: err });
    }
}

// Create a new Employee
async function createNewData(req, res) {
    try {
        let payload = req.body;

        // Generate employee_id based on the current year and employee count
        const currentYear = moment().format('YY');  // Get the last two digits of the current year, e.g., "24" for 2024

        // Count the number of employees created this year
        const employeeCount = await employee.countDocuments({ 
            employee_id: new RegExp(`^emp${currentYear}`)  // Match IDs starting with "emp<year>"
        });
        
        // Generate the new employee_id with the count incremented by 1
        payload.employee_id = `emp${currentYear}${(employeeCount + 1).toString().padStart(2, '0')}`;

        // Ensure a unique ObjectID if needed
        if (!payload.ID) {
            payload.ID = new mongoose.Types.ObjectId().toString();
        }

        const newEmployee = new employee(payload);
        const savedEmployee = await newEmployee.save();

        res.status(201).send({ status: true, data: savedEmployee });
    } catch (err) {
        console.error(err);
        res.status(400).send({ msg: 'Error creating Employee', data: err });
    }
}

// Update an existing Employee
async function updateSingleData(req, res) {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const updatedEmployee = await employee.findByIdAndUpdate(id, updateData, { new: true });
        if (updatedEmployee) {
            res.status(200).send({ status: true, data: updatedEmployee });
        } else {
            res.status(404).send({ status: false, msg: "Employee doesn't exist" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ msg: 'Error updating Employee', data: err });
    }
}

// Delete a Employee by ID
async function deleteSingleData(req, res) {
    const { id } = req.params;
    try {
        const deletedEmployee = await employee.findByIdAndDelete(id);
        if (deletedEmployee) {
            res.status(200).send({ status: true, msg: 'Employee deleted successfully' });
        } else {
            res.status(404).send({ status: false, msg: "Employee doesn't exist" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ msg: 'Error deleting Employee', data: err });
    }
};
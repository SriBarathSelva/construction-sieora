const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({

    employee_name: { type: String, required: false },
    employee_id: { type: String, required: false },
    email_address: { type: String, required:false },
    phone_number: { type: String, required:false },
    address: { type: String, required: false },
    city: { type: String, required: false },
    zip_code: { type: String, required:false },
    country: { type: String, required:false},
    role: { type: String, required:false},
    designation: { type: String, required:false},

    //task
    task: { type: String, required: false },
    employee_id: { type: String, required: false },
    


});

const employeeModel = mongoose.model('employee', projectSchema);
module.exports = employeeModel;

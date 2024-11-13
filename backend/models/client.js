const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({

    client_name: { type: String, required: false },
    email_address: { type: String, required:false },
    phone_number: { type: String, required:false },
    zip_code: { type: String, required:false },
    country: { type: String, required:false},
    type: { type: String, default: "" },
    city: { type: String, required: false },
    opening: { type: String, required:false},
    gst: { type: String, required:false},
    address: { type: String, required: false },


});

const clientModel = mongoose.model('client', projectSchema);
module.exports = clientModel;

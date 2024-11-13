

const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({

    
    opening_balance: { type: String,required: false },

});

const configurationModel = mongoose.model('configuration', projectSchema);
module.exports = configurationModel;
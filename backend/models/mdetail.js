

  const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({

 
        rq_sno: {type: 'String',required: false},
        rq_date: {type: 'String',required: false},
        rq_name: {type: 'String',required: false},
        rq_note: {type: 'String',required: false},
        rq_quantity: {type: 'String',required: false},
    

});

const mdetailsModel = mongoose.model('mdetails', projectSchema);
module.exports = mdetailsModel;
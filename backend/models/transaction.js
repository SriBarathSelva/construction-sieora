const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({

    transaction_id: { type: String, required: false },
    payment_type: { type: String, required: false },
    party_name: { type: String, required: false },
    payment_method: { type: String, required:false},
    category: { type: String, required:false},
    note: { type: String, default:'' },
    upload_bills: {
        type: [
            {
                url: { type: String },
                file_name: { type: String },
            }
        ], required: false, default: []
    },
    date: { type: String, required: false },
    amount: { type: String, default: ''},
    paid_by: { type: String, required:false},

});

const transactionModel = mongoose.model('transaction', projectSchema);
module.exports = transactionModel;

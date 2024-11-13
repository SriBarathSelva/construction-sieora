

const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({

    party_name: { type: String, required: false },
    phone_number: { type: String, required:false },
    party_type: { type: String, required:false },
    email: { type: String, required:false },
    address: { type: String, default: "" },


    gst:{type: String, required:false},
    legal_business_name:{type: String, required:false},
    state_of_supply:{type: String,required:false},
    billing_address:{type:String,require:false },


    party_will_pay: { type: Boolean, required: false },
    party_will_receive: { type: Boolean, required: false },
    amount:{type:Number,required:false},

    account_holder_name:{type:String,required:false},
    account_number:{type:String,required:false},
    IFSC_Code:{type:String,required:false},
    bank_name:{type:String,required:false},
    bank_address:{type:String,required:false},
    Iban_number:{type:String,required:false},
    UPI_Number:{type:String,required:false},
});

const partyModel = mongoose.model('party', projectSchema);
module.exports = partyModel;
const mongoose = require('mongoose')

const userschema = mongoose.Schema({
    user : {
        type : 'string',
        trim : true,
        required : true
    },
    email : {
        type : 'string',
        trim : true,
        required : true
    },
    password : {
        type : 'string',
        trim : true,
        required : true
    },
    isVerified : {
        type : 'boolean',
        default : false
    }
},
    {
        timestamps : true 
    
})

const User = mongoose.model('user',userschema)

module.exports = User
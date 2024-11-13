const mongoose = require('mongoose');

const demoSchema = new mongoose.Schema({
    Demo: {
        type: Array,
        required: true,
        default: []
    }
});

const DemoModel = mongoose.model('Demo', demoSchema);
module.exports = DemoModel;

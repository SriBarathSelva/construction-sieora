

const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({

    material_name: { type: String, required: false },
    nos: { type: String, required:false },
    gst: { type: String, required:false },
    cost_code: { type: String, required:false },
    description: { type: String, default: "" },

});

const libraryModel = mongoose.model('library', projectSchema);
module.exports = libraryModel;
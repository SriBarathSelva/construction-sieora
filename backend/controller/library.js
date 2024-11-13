const libraryModel = require('../Models/library');
const mongoose = require('mongoose');

let library = libraryModel;

module.exports = {
    listAllData,
    getSingleData,
    createNewData,
    updateSingleData,
    deleteSingleData,
};

// List all librarys
async function listAllData(req, res) {
    try {
        const alllibrarys = await library.find({});
        res.send({ status: true, data: alllibrarys });
    } catch (err) {
        console.error(err);
        res.status(500).send({ msg: 'Error retrieving librarys', data: err });
    }
}

// Get a single library by ID
async function getSingleData(req, res) {
    const { id } = req.params;
    try {
        const Library = await library.findById(id);
        if (Library) {
            res.status(200).send({ status: true, data: Library });
        } else {
            res.status(404).send({ status: false, msg: "library doesn't exist" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ msg: 'Error retrieving library', data: err });
    }
}

// Create a new library
async function createNewData(req, res) {
    try {
        // Ensure a unique ID is assigned if missing
        if (!req.body.ID) {
            req.body.ID = new mongoose.Types.ObjectId().toString();
        }

        const newlibrary = new library(req.body);
        const savedlibrary = await newlibrary.save();
        res.status(201).send({ status: true, data: savedlibrary });
    } catch (err) {
        console.error(err);
        res.status(400).send({ msg: 'Error creating library', data: err });
    }
}

// Update an existing library
async function updateSingleData(req, res) {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const updatedlibrary = await library.findByIdAndUpdate(id, updateData, { new: true });
        if (updatedlibrary) {
            res.status(200).send({ status: true, data: updatedlibrary });
        } else {
            res.status(404).send({ status: false, msg: "library doesn't exist" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ msg: 'Error updating library', data: err });
    }
}

// Delete a library by ID
async function deleteSingleData(req, res) {
    const { id } = req.params;
    try {
        const deletedlibrary = await library.findByIdAndDelete(id);
        if (deletedlibrary) {
            res.status(200).send({ status: true, msg: 'library deleted successfully' });
        } else {
            res.status(404).send({ status: false, msg: "library doesn't exist" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ msg: 'Error deleting library', data: err });
    }
};

const configurationModel = require('../Models/configuration');
const mongoose = require('mongoose');

let configuration = configurationModel;

module.exports = {
    listAllData,
    getSingleData,
    createNewData,
    updateSingleData,
    deleteSingleData,
};

// List all configurations
async function listAllData(req, res) {
    try {
        const allconfigurations = await configuration.find({});
        res.send({ status: true, data: allconfigurations });
    } catch (err) {
        console.error(err);
        res.status(500).send({ msg: 'Error retrieving configurations', data: err });
    }
}

// Get a single configuration by ID
async function getSingleData(req, res) {
    const { id } = req.params;
    try {
        const Configuration = await configuration.findById(id);
        if (Configuration) {
            res.status(200).send({ status: true, data: Configuration });
        } else {
            res.status(404).send({ status: false, msg: "configuration doesn't exist" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ msg: 'Error retrieving configuration', data: err });
    }
}

// Create a new configuration
async function createNewData(req, res) {
    try {
        // Ensure a unique ID is assigned if missing
        if (!req.body.ID) {
            req.body.ID = new mongoose.Types.ObjectId().toString();
        }

        const newconfiguration = new configuration(req.body);
        const savedconfiguration = await newconfiguration.save();
        res.status(201).send({ status: true, data: savedconfiguration });
    } catch (err) {
        console.error(err);
        res.status(400).send({ msg: 'Error creating configuration', data: err });
    }
}

// Update an existing configuration
async function updateSingleData(req, res) {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const updatedconfiguration = await configuration.findByIdAndUpdate(id, updateData, { new: true });
        if (updatedconfiguration) {
            res.status(200).send({ status: true, data: updatedconfiguration });
        } else {
            res.status(404).send({ status: false, msg: "configuration doesn't exist" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ msg: 'Error updating configuration', data: err });
    }
}

// Delete a configuration by ID
async function deleteSingleData(req, res) {
    const { id } = req.params;
    try {
        const deletedconfiguration = await configuration.findByIdAndDelete(id);
        if (deletedconfiguration) {
            res.status(200).send({ status: true, msg: 'configuration deleted successfully' });
        } else {
            res.status(404).send({ status: false, msg: "configuration doesn't exist" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ msg: 'Error deleting configuration', data: err });
    }
};

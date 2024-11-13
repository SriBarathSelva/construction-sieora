const mdetailsModel = require('../Models/mdetail');
const mongoose = require('mongoose');

let mdetails = mdetailsModel;

module.exports = {
    listAllData,
    getSingleData,
    createNewData,
    updateSingleData,
    deleteSingleData,
};

// List all mdetailss
async function listAllData(req, res) {
    try {
        const allmdetailss = await mdetails.find({});
        res.send({ status: true, data: allmdetailss });
    } catch (err) {
        console.error(err);
        res.status(500).send({ msg: 'Error retrieving mdetailss', data: err });
    }
}

// Get a single mdetails by ID
async function getSingleData(req, res) {
    const { id } = req.params;
    try {
        const Mdetails = await mdetails.findById(id);
        if (Mdetails) {
            res.status(200).send({ status: true, data: Mdetails });
        } else {
            res.status(404).send({ status: false, msg: "mdetails doesn't exist" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ msg: 'Error retrieving mdetails', data: err });
    }
}

// Create a new mdetails
async function createNewData(req, res) {
    try {
        // Ensure a unique ID is assigned if missing
        if (!req.body.ID) {
            req.body.ID = new mongoose.Types.ObjectId().toString();
        }

        const newmdetails = new mdetails(req.body);
        const savedmdetails = await newmdetails.save();
        res.status(201).send({ status: true, data: savedmdetails });
    } catch (err) {
        console.error(err);
        res.status(400).send({ msg: 'Error creating mdetails', data: err });
    }
}

// Update an existing mdetails
async function updateSingleData(req, res) {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const updatedmdetails = await mdetails.findByIdAndUpdate(id, updateData, { new: true });
        if (updatedmdetails) {
            res.status(200).send({ status: true, data: updatedmdetails });
        } else {
            res.status(404).send({ status: false, msg: "mdetails doesn't exist" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ msg: 'Error updating mdetails', data: err });
    }
}

// Delete a mdetails by ID
async function deleteSingleData(req, res) {
    const { id } = req.params;
    try {
        const deletedmdetails = await mdetails.findByIdAndDelete(id);
        if (deletedmdetails) {
            res.status(200).send({ status: true, msg: 'mdetails deleted successfully' });
        } else {
            res.status(404).send({ status: false, msg: "mdetails doesn't exist" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ msg: 'Error deleting mdetails', data: err });
    }
};

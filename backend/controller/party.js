const partyModel = require('../Models/party');
const mongoose = require('mongoose');

let party = partyModel;

module.exports = {
    listAllData,
    getSingleData,
    createNewData,
    updateSingleData,
    deleteSingleData,
};

// List all partys
async function listAllData(req, res) {
    try {
        const allpartys = await party.find({});
        res.send({ status: true, data: allpartys });
    } catch (err) {
        console.error(err);
        res.status(500).send({ msg: 'Error retrieving partys', data: err });
    }
}

// Get a single party by ID
async function getSingleData(req, res) {
    const { id } = req.params;
    try {
        const Party = await party.findById(id);
        if (Party) {
            res.status(200).send({ status: true, data: Party });
        } else {
            res.status(404).send({ status: false, msg: "party doesn't exist" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ msg: 'Error retrieving party', data: err });
    }
}

// Create a new party
async function createNewData(req, res) {
    try {
        // Ensure a unique ID is assigned if missing
        if (!req.body.ID) {
            req.body.ID = new mongoose.Types.ObjectId().toString();
        }

        const newparty = new party(req.body);
        const savedparty = await newparty.save();
        res.status(201).send({ status: true, data: savedparty });
    } catch (err) {
        console.error(err);
        res.status(400).send({ msg: 'Error creating party', data: err });
    }
}

// Update an existing party
async function updateSingleData(req, res) {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const updatedparty = await party.findByIdAndUpdate(id, updateData, { new: true });
        if (updatedparty) {
            res.status(200).send({ status: true, data: updatedparty });
        } else {
            res.status(404).send({ status: false, msg: "party doesn't exist" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ msg: 'Error updating party', data: err });
    }
}

// Delete a party by ID
async function deleteSingleData(req, res) {
    const { id } = req.params;
    try {
        const deletedparty = await party.findByIdAndDelete(id);
        if (deletedparty) {
            res.status(200).send({ status: true, msg: 'party deleted successfully' });
        } else {
            res.status(404).send({ status: false, msg: "party doesn't exist" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ msg: 'Error deleting party', data: err });
    }
};

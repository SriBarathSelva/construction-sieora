const clientModel = require('../Models/client');
const mongoose = require('mongoose');

let client = clientModel;

module.exports = {
    listAllData,
    getSingleData,
    createNewData,
    updateSingleData,
    deleteSingleData,
};

// List all clients
async function listAllData(req, res) {
    try {
        const allclients = await client.find({});
        res.send({ status: true, data: allclients });
    } catch (err) {
        console.error(err);
        res.status(500).send({ msg: 'Error retrieving clients', data: err });
    }
}

// Get a single client by ID
async function getSingleData(req, res) {
    const { id } = req.params;
    try {
        const Client = await client.findById(id);
        if (Client) {
            res.status(200).send({ status: true, data: Client });
        } else {
            res.status(404).send({ status: false, msg: "client doesn't exist" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ msg: 'Error retrieving client', data: err });
    }
}

// Create a new client
async function createNewData(req, res) {
    try {
        // Ensure a unique ID is assigned if missing
        if (!req.body.ID) {
            req.body.ID = new mongoose.Types.ObjectId().toString();
        }

        const newclient = new client(req.body);
        const savedclient = await newclient.save();
        res.status(201).send({ status: true, data: savedclient });
    } catch (err) {
        console.error(err);
        res.status(400).send({ msg: 'Error creating client', data: err });
    }
}

// Update an existing client
async function updateSingleData(req, res) {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const updatedclient = await client.findByIdAndUpdate(id, updateData, { new: true });
        if (updatedclient) {
            res.status(200).send({ status: true, data: updatedclient });
        } else {
            res.status(404).send({ status: false, msg: "client doesn't exist" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ msg: 'Error updating client', data: err });
    }
}

// Delete a client by ID
async function deleteSingleData(req, res) {
    const { id } = req.params;
    try {
        const deletedclient = await client.findByIdAndDelete(id);
        if (deletedclient) {
            res.status(200).send({ status: true, msg: 'client deleted successfully' });
        } else {
            res.status(404).send({ status: false, msg: "client doesn't exist" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ msg: 'Error deleting client', data: err });
    }
};

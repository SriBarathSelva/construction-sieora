const transactionModel = require('../Models/transaction');
const mongoose = require('mongoose');

let transaction = transactionModel;

module.exports = {
    listAllData,
    getSingleData,
    createNewData,
    updateSingleData,
    deleteSingleData,
};

// List all transactions
async function listAllData(req, res) {
    try {
        const alltransactions = await transaction.find({});
        res.send({ status: true, data: alltransactions });
    } catch (err) {
        console.error(err);
        res.status(500).send({ msg: 'Error retrieving transactions', data: err });
    }
}

// Get a single transaction by ID
async function getSingleData(req, res) {
    const { id } = req.params;
    try {
        const Transaction = await transaction.findById(id);
        if (Transaction) {
            res.status(200).send({ status: true, data: Transaction });
        } else {
            res.status(404).send({ status: false, msg: "transaction doesn't exist" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ msg: 'Error retrieving transaction', data: err });
    }
}

// Create a new transaction
async function createNewData(req, res) {
    try {
        // Ensure a unique ID is assigned if missing
        if (!req.body.ID) {
            req.body.ID = new mongoose.Types.ObjectId().toString();
        }

        const newtransaction = new transaction(req.body);
        const savedtransaction = await newtransaction.save();
        res.status(201).send({ status: true, data: savedtransaction });
    } catch (err) {
        console.error(err);
        res.status(400).send({ msg: 'Error creating transaction', data: err });
    }
}

// Update an existing transaction
async function updateSingleData(req, res) {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const updatedtransaction = await transaction.findByIdAndUpdate(id, updateData, { new: true });
        if (updatedtransaction) {
            res.status(200).send({ status: true, data: updatedtransaction });
        } else {
            res.status(404).send({ status: false, msg: "transaction doesn't exist" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ msg: 'Error updating transaction', data: err });
    }
}

// Delete a transaction by ID
async function deleteSingleData(req, res) {
    const { id } = req.params;
    try {
        const deletedtransaction = await transaction.findByIdAndDelete(id);
        if (deletedtransaction) {
            res.status(200).send({ status: true, msg: 'transaction deleted successfully' });
        } else {
            res.status(404).send({ status: false, msg: "transaction doesn't exist" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ msg: 'Error deleting transaction', data: err });
    }
};


const demoModel = require('../Models/Demo')




// DB
let DB = demoModel
module.exports = {
    listAllData,
    getSingleData,
    createNewData,
    updateSingleData,
    deleteSingleData,
}


// List all users
async function listAllData(req, res) {
    try {
        let allData = await DB.find({})
        if (allData) {
            res.send({ status: true, data: allData })
        } else {
            res.send({ status: false, data: 'problem with getting details' })
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ msg: 'Internal Server Error', data: err });
    }
}


// get a  User
async function getSingleData(req, res) {
    let { id } = req.params
    try {
        let checkDataExists = await DB.findOne({ _id: id });
        if (checkDataExists) {
            res.status(200).send({ status: true, data: checkDataExists });
        } else {
            res.status(409).send({ status: false, msg: "data doesn't exists" })
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ msg: 'Internal Server Error', data: err });
    }
};




// Create a new User
async function createNewData(req, res) {
    try {
        const createData = await DB.create(req.body);

        if (createData) {
            res.status(201).send({ status: true, data: createData });
        } else {
            return res.status(500).send({ status: false, data: 'Problem while creating data' });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ msg: 'Internal Server Error', data: err });
    }
};




// Create a new User
async function updateSingleData (req, res) {
    let payload = req.body
    let { id } = req.params
    try {
        let checkDataExists = await DB.findOne({ _id: id });
        if (checkDataExists) {
            let isDataUpdated = await DB.findOneAndUpdate({ _id: id }, { $set: payload }, { new: true })
            if (isDataUpdated) {
                res.status(200).send({ status: true, data: isDataUpdated });
            } else {
                res.send({ status: false, data: 'problem with updating user details' })
            }
        } else {
            res.status(409).send({ status: false, data: "user doesn't exists" })
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ msg: 'Internal Server Error', data: err });
    }
};



// Create a new User
async function deleteSingleData (req, res) {
    let { id } = req.params
    try {
        let checkDataExists = await DB.findOne({ _id: id });
        if (checkDataExists) {
            let isDataUpdated = await DB.findOneAndDelete({ _id: id })
            if (isDataUpdated) {
                res.status(200).send({ status: true });
            } else {
                res.send({ status: false, data: 'problem with updating data details' })
            }
        } else {
            res.status(409).send({ status: false, data: "data doesn't exists" })
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ msg: 'Internal Server Error', data: err });
    }
};




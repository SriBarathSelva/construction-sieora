const projectModel = require('../models/project');
const mongoose = require('mongoose');

let Project = projectModel;

module.exports = {
    listAllData,
    getSingleData,
    createNewData,
    updateSingleData,
    deleteSingleData,
};

// List all projects
async function listAllData(req, res) {
    try {
        const allProjects = await Project.find({});
        res.send({ status: true, data: allProjects });
    } catch (err) {
        console.error(err);
        res.status(500).send({ msg: 'Error retrieving projects', data: err });
    }
}

// Get a single project by ID
async function getSingleData(req, res) {
    const { id } = req.params;
    try {
        const project = await Project.findById(id);
        if (project) {
            res.status(200).send({ status: true, data: project });
        } else {
            res.status(404).send({ status: false, msg: "Project doesn't exist" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ msg: 'Error retrieving project', data: err });
    }
}

// Create a new project
async function createNewData(req, res) {
    try {
        // Ensure a unique ID is assigned if missing
        if (!req.body.ID) {
            req.body.ID = new mongoose.Types.ObjectId().toString();
        }

        const newProject = new Project(req.body);
        const savedProject = await newProject.save();
        res.status(201).send({ status: true, data: savedProject });
    } catch (err) {
        console.error(err);
        res.status(400).send({ msg: 'Error creating project', data: err });
    }
}

// Update an existing project
async function updateSingleData(req, res) {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const updatedProject = await Project.findByIdAndUpdate(id, updateData, { new: true });
        if (updatedProject) {
            res.status(200).send({ status: true, data: updatedProject });
        } else {
            res.status(404).send({ status: false, msg: "Project doesn't exist" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ msg: 'Error updating project', data: err });
    }
}

// Delete a project by ID
async function deleteSingleData(req, res) {
    const { id } = req.params;
    try {
        const deletedProject = await Project.findByIdAndDelete(id);
        if (deletedProject) {
            res.status(200).send({ status: true, msg: 'Project deleted successfully' });
        } else {
            res.status(404).send({ status: false, msg: "Project doesn't exist" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ msg: 'Error deleting project', data: err });
    }
};

const express = require('express');
const projectRouter = express.Router();
const controller = require('../Controller/Projects')



projectRouter.get('/', controller.listAllData)
projectRouter.get('/:id', controller.getSingleData)
projectRouter.post('/', controller.createNewData)
projectRouter.put('/:id', controller.updateSingleData)
projectRouter.delete('/:id', controller.deleteSingleData)

module.exports = projectRouter;

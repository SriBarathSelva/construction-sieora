const express = require('express');
const employeeRouter = express.Router();
const controller = require('../Controller/employee')



employeeRouter.get('/', controller.listAllData)
employeeRouter.get('/:id', controller.getSingleData)
employeeRouter.post('/', controller.createNewData)
employeeRouter.put('/:id', controller.updateSingleData)
employeeRouter.delete('/:id', controller.deleteSingleData)

module.exports = employeeRouter;

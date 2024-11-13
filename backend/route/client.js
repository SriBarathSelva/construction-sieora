const express = require('express');
const clientRouter = express.Router();
const controller = require('../Controller/client')



clientRouter.get('/', controller.listAllData)
clientRouter.get('/:id', controller.getSingleData)
clientRouter.post('/', controller.createNewData)
clientRouter.put('/:id', controller.updateSingleData)
clientRouter.delete('/:id', controller.deleteSingleData)

module.exports = clientRouter;

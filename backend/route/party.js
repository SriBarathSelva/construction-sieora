const express = require('express');
const partyRouter = express.Router();
const controller = require('../Controller/party')



partyRouter.get('/', controller.listAllData)
partyRouter.get('/:id', controller.getSingleData)
partyRouter.post('/', controller.createNewData)
partyRouter.put('/:id', controller.updateSingleData)
partyRouter.delete('/:id', controller.deleteSingleData)

module.exports = partyRouter;

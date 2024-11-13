const express = require('express');
const libraryRouter = express.Router();
const controller = require('../Controller/library')



libraryRouter.get('/', controller.listAllData)
libraryRouter.get('/:id', controller.getSingleData)
libraryRouter.post('/', controller.createNewData)
libraryRouter.put('/:id', controller.updateSingleData)
libraryRouter.delete('/:id', controller.deleteSingleData)

module.exports = libraryRouter;

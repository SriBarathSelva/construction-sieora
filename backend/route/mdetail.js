const express = require('express');
const mdetailRouter = express.Router();
const controller = require('../Controller/mdetail')



mdetailRouter.get('/', controller.listAllData)
mdetailRouter.get('/:id', controller.getSingleData)
mdetailRouter.post('/', controller.createNewData)
mdetailRouter.put('/:id', controller.updateSingleData)
mdetailRouter.delete('/:id', controller.deleteSingleData)

module.exports = mdetailRouter;

const express = require('express');
const router = express.Router();
const controller = require('../Controller/Demo.js')



router.get('/', controller.listAllData)
router.get('/:id', controller.getSingleData)
router.post('/', controller.createNewData)
router.put('/:id', controller.updateSingleData)
router.delete('/:id', controller.deleteSingleData)

module.exports = router;

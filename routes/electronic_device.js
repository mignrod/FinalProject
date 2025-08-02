const express = require("express");
const router = express.Router();

const deviceController = require('../controller/device');
const validation = require('../middleware/validate');

router.get('/', deviceController.getAllDevices);
router.get('/:id', deviceController.getSingleDevice);
router.post('/',validation.saveDevice, deviceController.createDevice);
router.put('/:id',validation.saveDevice,deviceController.updateDevice);
router.delete('/:id', deviceController.deleteDevice);

/*
router.get('/', (req,res) => {
    // swagger.tags=['Hello World']
   res.send('Hellow World at week 05 teams 06');
});
*/

module.exports = router;
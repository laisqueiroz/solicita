const express = require('express');
const EquipmentController = require('../controllers/EquipmentController');

const router = express.Router();

router.get('/', EquipmentController.getAllEquipment);
router.get('/:id', EquipmentController.getEquipmentById);
router.post('/', EquipmentController.createEquipment);
router.put('/:id', EquipmentController.updateEquipment);
router.delete('/:id', EquipmentController.deleteEquiment);

module.exports = router;
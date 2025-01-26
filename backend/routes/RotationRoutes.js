const express = require('express');
const RotationController = require('../controllers/RotationController');

const router = express.Router();

router.get('/', RotationController.getAllRotations);
router.get('/:id', RotationController.getRotationById);
router.post('/', RotationController.createRotation);
router.put('/:id', RotationController.updateRotation);
router.delete('/:id', RotationController.deleteRotation);

module.exports = router;
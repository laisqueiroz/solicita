const express = require('express');
const SolicitationController = require('../controllers/SolicitationController');

const router = express.Router();

router.get('/', SolicitationController.getAllSolicitations);
router.get('/:id', SolicitationController.getSolicitationById);
router.post('/', SolicitationController.createSolicitation);
router.put('/:id', SolicitationController.updateSolicitation);
router.delete('/:id', SolicitationController.deleteSolicitation);

module.exports = router;
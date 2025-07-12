const express = require('express');
const SolicitationController = require('../controllers/SolicitationController');
const { authenticateJWT } = require("../middlewares/AuthMiddleware");

const router = express.Router();

router.get('/', authenticateJWT, SolicitationController.getAllSolicitations);
router.get('/:id', SolicitationController.getSolicitationById);
router.post('/', authenticateJWT, SolicitationController.createSolicitation);
router.put('/:id', authenticateJWT, SolicitationController.updateSolicitation);
router.delete('/:id', SolicitationController.deleteSolicitation);

module.exports = router;
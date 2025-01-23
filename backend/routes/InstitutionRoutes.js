const express = require('express');
const InstitutionController = require('../controllers/InstitutionController');

const router = express.Router();

router.get('/', InstitutionController.getAllInstitutions);
router.get('/:id', InstitutionController.getInstitutionsById);
router.post('/', InstitutionController.createInstitution);
router.put('/:id', InstitutionController.updateInstitution);
router.delete('/:id', InstitutionController.deleteInstitution);

module.exports = router;
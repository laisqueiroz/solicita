const express = require('express');
const DepartmentController = require('../controllers/DepartmentController');

const router = express.Router();

router.get('/', DepartmentController.getAllDepartment);
router.get('/:id', DepartmentController.getDepartmentById);
router.post('/', DepartmentController.createDepartment);
router.put('/:id', DepartmentController.updateDepartment);
router.delete('/:id', DepartmentController.deleteDepartment);

module.exports = router;
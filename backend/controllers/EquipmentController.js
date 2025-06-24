const EquipmentService = require('../services/EquipmentService');
const DepartmentController = require('../controllers/DepartmentController');
const RotationController = require('../controllers/RotationController');

class EquipmentController {
    static async getAllEquipment(req, res) {
        try {
            const equipment = await EquipmentService.getAllEquipment();
            res.json(equipment);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getEquipmentById(req, res) {
        const { id } = req.params;
        try {
            const equipment = await EquipmentService.getEquipmentById(id);
            res.json(equipment);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async createEquipment(req, res) {
        const { name, address, nameDepartment, shift, vacant } = req.body;

        if (!name || !shift || !vacant || !address || !nameDepartment) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
        }
        try {
            const equipmentExist = await EquipmentService.getEquipmentByName(name);
            if (equipmentExist) return res.status(403).json({ error: 'Equipamento já existe.' });
            
            const equipment = await EquipmentService.createEquipment({ name, address });

            const equipmentId = equipment.id;
            const Department = await DepartmentController.createDepartment({nameDepartment, equipmentId});

            const departmentId = Department.id;
            const Rotation = await RotationController.createRotation({ departmentId, shift, vacant});
            return res.status(201).json();
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    static async updateEquipment(req, res) {
        const { id } = req.body;
        const equipmentToUpdate = await EquipmentService.getEquipmentById(id);
        if (!equipmentToUpdate) return res.status(404).json({ error: "Equipamento não encontrado ou não existe." });
        try {
            const { name, address, department, shift, vacant } = req.body;
            if (name !== equipmentToUpdate.name) return res.status(403).json({ error: "Nome do equipamento não pode ser alterado." });
            if (address !== equipmentToUpdate.address) 
            await equipmentToUpdate.save();
            const equipment = await EquipmentService.updateEquipment(equipmentToUpdate);
            res.json(equipment);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async deleteEquiment(req, res){
        const { id } = req.params;
        try {
            await EquipmentService.deleteEquipment(id);
            res.json({ message: 'Equipamento deletado com sucesso!' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = EquipmentController;
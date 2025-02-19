const EquipmentService = require('../services/EquipmentService');
const RotationService = require('../services/RotationService');

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
        try {
            const { name, shift, vacant } = req.body;

            if (!name || !shift || !vacant) {
                res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
            }
            const equipment = await EquipmentService.createEquipment({ name });
            console.log('criou  equipamento');

            const equipmentId = equipment.id;
            const createRotation = await RotationService.createRotation({shift , vacant , equipmentId});
            res.status(201).json();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async updateEquipment(req, res) {
        const { id } = eq.params;
        const equipmentToUpdate = await EquipmentService.getEquipmentById(id);
        if (!equipmentToUpdate) return res.status(404).json({ error: error.message });
        try {
            const { name } = req.body;
            if (name) equipmentToUpdate.name = name;

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
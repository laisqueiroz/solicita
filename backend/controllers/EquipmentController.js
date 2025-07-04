const EquipmentService = require('../services/EquipmentService');

class EquipmentController {
    static async getAllEquipment(req, res) {
        try {
            const equipment = await EquipmentService.getAllEquipment();
            return res.json(equipment);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async getEquipmentById(req, res) {
        const { id } = req.params;
        try {
            const equipment = await EquipmentService.getEquipmentById(id);
            return res.json(equipment);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    static async createEquipment(req, res) {
        const { name, address} = req.body;

        if (!name || !address ) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
        }
        try {
            const nameUpperCase = name.toUpperCase();
            const equipmentExist = await EquipmentService.getEquipmentByName(nameUpperCase);
            if (equipmentExist) return res.status(403).json({ error: 'Equipamento já existe.' });
            
            const equipment = await EquipmentService.createEquipment({ name, address });

            return res.status(201).json(equipment);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    static async updateEquipment(req, res) {
        const { id } = req.params;
        const equipmentToUpdate = await EquipmentService.getEquipmentById(id);
        if (!equipmentToUpdate) return res.status(404).json({ error: "Equipamento não encontrado ou não existe." });
        try {
            const { address } = req.body;
            const equipment = await EquipmentService.updateEquipment(equipmentToUpdate.id, {address});
            return res.json(equipment);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    static async deleteEquiment(req, res){
        const { id } = req.params;
        try {
            await EquipmentService.deleteEquipment(id);
            return res.json({ message: 'Equipamento deletado com sucesso!' });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

module.exports = EquipmentController;
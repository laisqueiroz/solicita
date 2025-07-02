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

        console.log("chegou no controller!")
        console.log("Esse é o name: ", name)
        console.log("Esse é o address: ", address)

        if (!name || !address ) {
            console.log("não passou na validação")
            return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
        }
        try {
            console.log("passou na validação")
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
        const { id } = req.body;
        const equipmentToUpdate = await EquipmentService.getEquipmentById(id);
        if (!equipmentToUpdate) return res.status(404).json({ error: "Equipamento não encontrado ou não existe." });
        try {
            const { name, address } = req.body;
            if (name !== equipmentToUpdate.name) return res.status(403).json({ error: "Nome do equipamento não pode ser alterado." });
            if (address !== equipmentToUpdate.address) 
            await equipmentToUpdate.save();
            const equipment = await EquipmentService.updateEquipment(equipmentToUpdate);
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
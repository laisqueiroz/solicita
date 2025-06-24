const RotationService = require('../services/RotationService');

class RotationController {
    static async getAllRotations(req, res){
        try {
            const rotations = await RotationService.getAll();
            res.json(rotations);
        } catch (error) {
            res.status(500).json({ error: error.massage });
        }
    }

    static async getRotationById(req, res) {
        const { id } = req.params;
        try{
            const rotations = await RotationService.getRotationById(id);
            res.json(rotations);
        } catch (error) {
            res.status(400).json({ error: error.massage });
        }
    }

    static async createRotation(req, res) {
        try{
            const { name , vacant , departmentId } = req.body;
            if ( !name || !vacant || !departmentId ) {
                res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
            }
            const rotation = await RotationService.createRotation({ name, vacant, departmentId});
            res.status(201).json(rotation);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async updateRotation(req, res) {
        const { id } = req.params;
        const RotationToUpdate = await RotationService.getRotationById(id);
        if (!RotationToUpdate) return res.status(404).json({ error: 'Turno não encontrado!' });
        try {
            const { name, vacant } = req.body;
            if (name) RotationToUpdate.name = name;
            if (vacant) RotationToUpdate.vacant = vacant;

            await RotationToUpdate.save();
            const rotation = await RotationService.updateRotation(id, RotationToUpdate);
            res.json(rotation);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async deleteRotation(req, res) {
        const { id } = req.params;
        try {
            await RotationService.deleteRotation(id);
            res.json({ message: 'Turno excluído com sucesso!' })
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = RotationController;
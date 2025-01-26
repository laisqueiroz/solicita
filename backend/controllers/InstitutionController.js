const InstitutionService = require('../services/InstitutionService');

class InstitutionController {
    static async getAllInstitutions(req, res) {
        try{
            const institutions = await InstitutionService.getAllInstitutions();
            res.json(institutions);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getInstitutionsById(req, res) {
        const { id } = req.params;
        try{
            const institutions = await InstitutionService.getInstitutionById(id);
            res.json(institutions);
        } catch (error) {
            res.status(400).json({ error: error.message});
        }
    }

    static async createInstitution(req, res) {
        try {
            const { name , cnpj } = req.body;
            if (!name || !cnpj) {
                res.status(400).json({ message: 'Todos os campos são obrigatórios!' })
            }
            const institution = await InstitutionService.createInstitution({ name, cnpj });
            res.status(201).json(institution);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async updateInstitution(req, res) {
        const { id } = req.params;
        const institutionToUpdate = await InstitutionService.getInstitutionById(id);
        if (!institutionToUpdate) return res.status(404).json({ error: 'Instituição não encontrada!' });
        try {
            const { name, cnpj } = req.body;
            if (name) institutionToUpdate.name = name;
            if (cnpj) institutionToUpdate.cnpj = cnpj;

            await institutionToUpdate.save();
            const institution = await InstitutionService.updateInstitution(id, institutionToUpdate);
            res.json(institution);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async deleteInstitution(req, res){
        const { id } = req.params;
        try{
            await InstitutionService.deleteInstitution(id);
            res.json({ message: 'Instituição deletada com sucesso!'});
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = InstitutionController;
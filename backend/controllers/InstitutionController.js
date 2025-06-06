const InstitutionService = require('../services/InstitutionService');

class InstitutionController {
    static async getAllInstitutions(req, res) {
        const { cnpj } = req.query;
        try{
            if (cnpj) {
                const institution = await InstitutionService.getInstitutionByCNPJ(cnpj);
                return res.status(200).json(institution);
            }
            const institutions = await InstitutionService.getAllInstitutions();
            return res.json(institutions);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async getInstitutionsById(req, res) {
        const { id } = req.params;
        try{
            const institutions = await InstitutionService.getInstitutionById(id);
            return res.status(200).json(institutions);
        } catch (error) {
            return res.status(400).json({ error: error.message});
        }
    }

    static async createInstitution(req, res) {
        try {
            const { name , cnpj } = req.body;
            if (!name || !cnpj) {
                res.status(400).json({ message: 'Todos os campos são obrigatórios!' })
            }
            const institution = await InstitutionService.createInstitution({ name, cnpj });
            return res.status(201).json(institution);
        } catch (error) {
            return res.status(400).json({ error: error.message });
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
            return res.json(institution);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    static async deleteInstitution(req, res){
        const { id } = req.params;
        try{
            await InstitutionService.deleteInstitution(id);
            return res.status(200).json({ message: 'Instituição deletada com sucesso!'});
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

module.exports = InstitutionController;
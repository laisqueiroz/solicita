const InstitutionService = require('../services/InstitutionService');
const ValidateDates = require('../services/ValidateDates');

class InstitutionController {
    static async getAllInstitutions(req, res) {
        await ValidateDates.validateStatus();
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
            const { name , cnpj , email , address , phone , dateRegister, validityPeriod  } = req.body;
            if (!name || !cnpj || !email || !dateRegister ||!validityPeriod) {
                return res.status(400).json({ message: 'Campos obrigatórios não preenchidos.' });
            }
            const { endDate, status } = await ValidateDates.calculateDateAndStatus(dateRegister, validityPeriod)
            const institution = await InstitutionService.createInstitution({ name, cnpj, email, address, phone, dateRegister, validityPeriod, endDate, status });
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
            const { name , cnpj , email , address , phone , dateRegister, validityPeriod } = req.body;
            if (name) institutionToUpdate.name = name;
            if (cnpj) institutionToUpdate.cnpj = cnpj;
            if (email) institutionToUpdate.email = email;
            if (address) institutionToUpdate.address = address;
            if (phone) institutionToUpdate.phone = phone;
            if (dateRegister || validityPeriod) {
                institutionToUpdate.dateRegister = dateRegister;
                institutionToUpdate.validityPeriod = validityPeriod;
                const { endDate, status } = await ValidateDates.calculateDateAndStatus(dateRegister, validityPeriod);
                institutionToUpdate.endDate = endDate;
                institutionToUpdate.status = status;
            };

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
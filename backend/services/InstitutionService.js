const InstitutionRepository = require('../repositories/InstitutionRepository')

class InstitutionService {
    static async getAllInstitutions() {
        return InstitutionRepository.findAll();
    }

    static async getInstitutionById(id) {
        return InstitutionRepository.findById(id);
    }

    static async createInstitution(data) {
        return InstitutionRepository.create(data);
    }

    static async updateInstitution(id, data) {
        return InstitutionRepository.update(id, data);
    }

    static async deleteInstitution(id) {
        return InstitutionRepository.delete(id);
    }
}

module.exports = InstitutionService;
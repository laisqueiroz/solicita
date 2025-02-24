const SolicitationRepository = require('../repositories/SolicitationRepository');

class SolicitationService {
    static async getAll() {
        return SolicitationRepository.findAll();
    }

    static async getByUserId(userId) {
        return SolicitationRepository.findByUserId(userId);
    }

    static async getOne(data){
        return SolicitationRepository.findOne(data);
    }

    static async getSolicitationById(id) {
        return SolicitationRepository.findById(id);
    }

    static async createSolicitation(data) {
        return SolicitationRepository.create(data);
    }

    static async updateSolicitation(id, data) {
        return SolicitationRepository.update(id, data);
    }

    static async deleteSolicitation(id) {
        return SolicitationRepository.delete(id);
    }
}

module.exports = SolicitationService;
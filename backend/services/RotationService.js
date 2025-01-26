const RotationRepository = require('../repositories/RotationRepository')

class RotationService {
    static async getAll() {
        return RotationRepository.findAll();
    }

    static async getRotationById(id) {
        return RotationRepository.findById(id);
    }

    static async createRotation(data) {
        return RotationRepository.create(data);
    }

    static async updateRotation(id, data) {
        return RotationRepository.update(id, data);
    }

    static async deleteRotation(id) {
        return RotationRepository.delete(id);
    }
}

module.exports = RotationService;
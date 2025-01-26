const EquipmentRepository = require('../repositories/EquipmentRepository');

class EquipmentService {
    static async getAllEquipment() {
        return EquipmentRepository.findAll();
    }

    static async getEquipmentById() {
        return EquipmentRepository.findById();
    }

    static async createEquipment(data) {
        return EquipmentRepository.create(data);
    }

    static async updateEquipment(id, data) {
        return EquipmentRepository.update(id, data);
    }

    static async deleteEquipment(id) {
        return EquipmentRepository.delete(id);
    }
}

module.exports = EquipmentService;
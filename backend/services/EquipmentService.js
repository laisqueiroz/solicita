const EquipmentRepository = require('../repositories/EquipmentRepository');

class EquipmentService {
    static async getAllEquipment() {
        return EquipmentRepository.findAll();
    }

    static async getEquipmentById(id) {
        return EquipmentRepository.findById(id);
    }

    static async getEquipmentByName(name) {
        try {
            return EquipmentRepository.findOne(name);
        } catch (eror) {
            return ('erro na consulta ao repository')
        }
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
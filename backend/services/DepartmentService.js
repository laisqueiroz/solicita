const DepartmentRepository = require('../repositories/DepartmentRepository')

class DepartmentService {
    static async getAll() {
        return DepartmentRepository.findAll();
    }

    static async getDepartmentById(id) {
        return DepartmentRepository.findById(id);
    }

    static async createDepartment(data) {
        return DepartmentRepository.create(data);
    }

    static async updateDepartment(id, data) {
        return DepartmentRepository.update(id, data);
    }

    static async deleteDepartment(id) {
        return DepartmentRepository.delete(id);
    }
}

module.exports = DepartmentService;
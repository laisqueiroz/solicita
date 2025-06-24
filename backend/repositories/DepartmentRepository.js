const { Department } = require('../models');

class DepartmentRepository {
    static async findAll() {
        return Department.findAll();
    }

    static async findById(id) {
        return Department.findByPk(id);
    }

    static async create(data) {
        return Department.create(data);
    }


    static async update(id, data) {
        const department = await Department.findByPk(id);

        Object.assign(department, data);
        return department.save();
    }

    static async delete(id) {
        const department = await Department.findByPk(id);

        await department.destroy();
        return true;
    }
}

module.exports = DepartmentRepository;
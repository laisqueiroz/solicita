const { Rotation } = require('../models');

class RotationRepository {
    static async findAll() {
        return Rotation.findAll();
    }

    static async findById(id) {
        return Rotation.findByPk(id);
    }

    static async create(data) {
        return Rotation.create(data);
    }


    static async update(id, data) {
        const rotation = await Rotation.findByPk(id);

        Object.assign(rotation, data);
        return rotation.save();
    }

    static async delete(id) {
        const rotation = await Rotation.findByPk(id);

        await rotation.destroy();
        return true;
    }
}

module.exports = RotationRepository;
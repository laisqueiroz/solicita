const { Equipment, Department, Rotation } = require('../models');


class EquipmentRepository{
    static async findAll() {
        return Equipment.findAll({
            include: {
                model: Department,
                attributes: ['id', 'nameDepartment'],
                include: {
                    model: Rotation,
                    attributes: ['id', 'shift', 'vacant'],
                },
            }
        });
    }

    static async findById(id) {
        return Equipment.findByPk(id);
    }

    static async findOne(name){
        return await Equipment.findOne({where: {name}});
    }

    static async create(data) {
        return Equipment.create(data);
    }

    static async update(id, data) {
        const equipment = await Equipment.findByPk(id);

        Object.assign(equipment, data);
        return equipment.save();
    }

    static async delete(id){
        const equipment = await Equipment.findByPk(id);

        await equipment.destroy();
        return true;
    }
}

module.exports = EquipmentRepository;
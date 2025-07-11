const { Solicitation, Equipment, Institution, Department, Rotation } = require('../models');

class SolicitationRepository {
    static async findAll() {
        return Solicitation.findAll({
            include: [
                { model: Equipment, attributes: ['name'] },
                { model: Institution, attributes: ['name'] },
                { model: Department, attributes: ['nameDepartment'] },
                { model: Rotation, attributes: ['shift'] }
            ]
        });
    }

    static async findByUserId(userId) {
        return Solicitation.findAll({where: {userId}});
    }

    static async findOne(code) {
        return Solicitation.findOne({where: {code}});
    }

    static async findById(id) {
        return Solicitation.findByPk(id);
    }

    static async create(data) {
        return Solicitation.create(data);
    }


    static async update(id, data) {
        const solicitation = await Solicitation.findByPk(id);

        Object.assign(solicitation, data);
        return solicitation.save();
    }

    static async delete(id) {
        const solicitation = await Solicitation.findByPk(id);

        await solicitation.destroy();
        return true;
    }
}

module.exports = SolicitationRepository;
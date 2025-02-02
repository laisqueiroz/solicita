const { Solicitation } = require('../models');

class SolicitationRepository {
    static async findAll() {
        return Solicitation.findAll();
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
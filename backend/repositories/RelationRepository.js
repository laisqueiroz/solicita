const { Relation } = require('../models');

class RelationRepository {
    static async findAll() {
        return Relation.findAll();
    }

    static async findById(id) {
        return Relation.findByPk(id);
    }

    static async create(data) {
        return Relation.create(data);
    }


    static async update(id, data) {
        const relation = await Relation.findByPk(id);

        Object.assign(relation, data);
        return relation.save();
    }

    static async delete(id) {
        const relation = await Relation.findByPk(id);

        await relation.destroy();
        return true;
    }
}

module.exports = RelationRepository;
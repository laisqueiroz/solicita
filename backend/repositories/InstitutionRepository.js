const { where } = require('sequelize');
const { Institution } = require('../models');

class InstitutionRepository {
    static async findAll() {
        return Institution.findAll();
    }

    static async findOne(cnpj) {
        return Institution.findOne({where: {cnpj}});
    }

    static async findById(id) {
        return Institution.findByPk(id);
    }

    static async create(data) {
        return Institution.create(data);
    }

    static async update(id, data) {
        const institution = await Institution.findByPk(id);
        if (!institution) return null;

        Object.assign(institution, data);
        return institution.save();
    }

    static async delete(id) {
        const institution = await Institution.findByPk(id);
        if (!institution) return null;

        await institution.destroy();
        return true;
    }
}

module.exports = InstitutionRepository;
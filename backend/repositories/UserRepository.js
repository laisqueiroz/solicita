const { where } = require('sequelize');
const { User } = require('../models');

class UserRepository {
    static async findAll() {
        return User.findAll();
    }

    static async findOne(cpf){
        return await User.findOne({where: {cpf}});
    }

    static async findById(id) {
        return User.findByPk(id);
    }

    static async create(data) {
        return User.create(data);
    }

    static async update(id, data) {
        const user = await User.findByPk(id);
        if (!user) return null;

        Object.assign(user, data);
        return user.save();
    }

    static async delete(id) {
        const user = await User.findByPk(id);
        if (!user) return null;

        await user.destroy();
        return true;
    }
}

module.exports = UserRepository;
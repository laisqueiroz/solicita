const UserRepository = require('../repositories/UserRepository');

class UserService {
    static async getAllUsers() {
        return UserRepository.findAll();
    }

    static async getUserById(id) {
        return UserRepository.findById(id);
    }

    static async createUser(data) {
        return UserRepository.create(data);
    }

    static async updateUser(id, data) {
        return UserRepository.update(id, data);
    }

    static async deleteUser(id) {
        return UserRepository.delete(id);
    }
}

module.exports = UserService;
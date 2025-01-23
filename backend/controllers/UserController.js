const UserService = require('../services/UserService');

class UserController {
    static async getAllUsers(req, res) {
        try{
            const users = await UserService.getAllUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getUserById(req, res) {
        const { id } = req.params;
        try {
            const user = await UserService.getUserById(id);
            if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
            res.json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async createUser(req, res) {
        try {
            const { name , email , password , cpf , role } = req.body;
            if (!name || !email || !password || !cpf || !role) {
                res.status(400).json({ message: 'Todos os campos são obrigatórios!' })
            };
            const user = await UserService.createUser({name, email, password, cpf, role});
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async updateUser(req, res) {
        const { id } = req.params;
        try {
            const user = await UserService.updateUser(id, req.body);
            if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' });
            res.json(user);
        } catch(error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async deleteUser(req, res) {
        const { id } = req.params;
        try {
            await UserService.deleteUser(id);
            res.json({ message: 'Usuário deletado com sucesso!' });
        } catch(error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = UserController;
const UserService = require('../services/UserService');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

class UserController {
    static async loginUser(req, res) {
        if (!secretKey) {
            throw new Error('A SECRET_KEY não foi definida. Verifique o arquivo .env');
        }
        try {
            const { cpf, password } = req.body;
            if (!cpf || !password) {
                return res.status(400).json({ error: 'CPF e senha são obrigatórios.' });
            }
            const user = await UserService.getUserByCPF(cpf);
            if (!user) {
                return res.status(401).json({ error: 'Usuário não existe ou as credenciais fornecidas estão incorretas.' });
            }
            if (user.active == 'false') {
                return res.status(403).json({error: 'Usuário não pode acessar o sistema!'})
            }

            const isPasswodValid = await bcrypt.compare(password, user.password);
            if (!isPasswodValid) {
                console.log('a validação da senha está vazia.')
                return res.status(401).json({ error: 'Senha incorreta.' })
            }

            const token = jwt.sign({ id: user.id, role: user.role }, secretKey, {expiresIn: '2h',});
            res.status(200).json({token});
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Erro ao realizar o login.' });
        }
    }

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
            const { name , email , password , cpf ,position} = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);

            if (!name || !email || !password || !cpf || !position) {
                res.status(400).json({ message: 'Todos os campos são obrigatórios!' })
            };
            const role = 'regular';
            const active = 'false';
            const newUser = await UserService.createUser({name, email, password: hashedPassword, cpf, position ,role, active});
            res.status(201).json(newUser);
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
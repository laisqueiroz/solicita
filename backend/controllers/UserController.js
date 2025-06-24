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
            if (!cpf || !password) return res.status(400).json({ message: 'CPF e senha são obrigatórios.' });

            const user = await UserService.getUserByCPF(cpf);
            if (!user) return res.status(401).json({ message: 'Usuário não existe ou as credenciais fornecidas estão incorretas.' });
            if (user.active == 'false') return res.status(403).json({message: 'Usuário não pode acessar o sistema!'});

            const isPasswodValid = await bcrypt.compare(password, user.password);
            if (!isPasswodValid) return res.status(401).json({ message: 'Senha incorreta. Tente novamente.' });

            const token = jwt.sign({ id: user.id, role: user.role }, secretKey, {expiresIn: '2h',});
            res.status(200).json({token , role: user.role});
        } catch (error) {
            res.status(500).json({ error: 'Erro ao processar os dados.' });
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
        const { name , email , password , cpf ,position, institutionId, dateBirth} = req.body;
        if (!name || !email || !password || !cpf || !position || !institutionId || !dateBirth) {
            res.status(400).json({ message: 'Todos os campos são obrigatórios!' })
        };

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const role = 'regular';
            const active = 'false';
            const newUser = await UserService.createUser({name, email, password: hashedPassword, cpf, position ,role, active, dateBirth, institutionId});
            res.status(201).json(newUser);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async updateUser(req, res) {
        const { id } = req.params;
        const userExist = await UserService.getUserById(id);
        if (!userExist) return res.status(404).json({ error: 'Usuário não encontrado' });
        const userRole = req.user.role;
        try {
            const { name , email , password , cpf ,position, role, active} = req.body;
            if ( name != userExist.name ) return res.status(403).json({ error: 'Nome não pode ser alterado.' });
            if ( cpf != userExist.cpf ) return res.status(403).json({ error: 'CPF não pode ser alterado.' });
            const isPasswodValid = await bcrypt.compare(password, user.password);
            if (isPasswodValid) return res.status(400).json({ error: 'A nova senha não pode ser igual à senha atual.' });
            if (!isPasswodValid) {
                const hashedPassword = await bcrypt.hash(password, 10);
                userExist.password = hashedPassword;
            }
            if (email) userExist.email = email;
            if (position) userExist.position = position;
            if (role) {
                if (userRole != 'admin') return res.status(403).json({ error: 'Papel de usuário não pode ser alterado.' });
                userExist.role = role;
            } 
            if (active) {
                if (userRole != 'admin') return res.status(403).json({ error: 'Usuário não tem permissão para realizar a ação.' });
                userExist.active = active;
            }

            await userExist.save();
            const user = await UserService.updateUser(id, userExist);
            res.json(user);
        } catch(error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async deleteUser(req, res) {
        const { id } = req.params;
        const userRole = req.user.role;
        const userId = req.user.id;
        try {
            if (id != userId && userRole != 'admin') return res.status(403).json({ error: 'Usuário não tem autorização para esta ação.' });
            await UserService.deleteUser(id);
            res.json({ message: 'Usuário deletado com sucesso!' });
        } catch(error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = UserController;
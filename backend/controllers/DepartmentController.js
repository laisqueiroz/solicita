const DepartmentService = require('../services/DepartmentService');
const RotationController = require('../controllers/RotationController');

class DepartmentController {
    static async getAllDepartment(req, res){
        try {
            const departments = await DepartmentService.getAll();
            res.json(departments);
        } catch (error) {
            res.status(500).json({ error: error.massage });
        }
    }

    static async getDepartmentById(req, res) {
        const { id } = req.params;
        try{
            const departments = await DepartmentService.getDepartmentById(id);
            res.json(departments);
        } catch (error) {
            res.status(400).json({ error: error.massage });
        }
    }

    static async createDepartment(req, res) {
        try{
            const { nameDepartment, equipmentId } = req.body;
            if ( !nameDepartment || !equipmentId ) {
                res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
            }
            
            const departmentCreate = await DepartmentService.createDepartment({ nameDepartment, equipmentId });

            res.status(201).json(departmentCreate);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async updateDepartment(req, res) {
        const { id } = req.params;
        const DepartmentToUpdate = await DepartmentService.getDepartmentById(id);
        if (!DepartmentToUpdate) return res.status(404).json({ error: 'Departamento não encontrado!' });
        try {
            const { name } = req.body;
            if (name) DepartmentToUpdate.name = name;

            await DepartmentToUpdate.save();
            const department = await DepartmentService.updateDepartment(id, DepartmentToUpdate);
            res.json(department);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async deleteDepartment(req, res) {
        const { id } = req.params;
        try {
            await DepartmentService.deleteDepartment(id);
            res.json({ message: 'Departamento excluído com sucesso!' })
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = DepartmentController;
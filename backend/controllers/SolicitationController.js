const SolicitationService = require('../services/SolicitationService');
const GenerateCode = require('../services/GenerateCodeService');

class SolicitationController {

    static async getAllSolicitations(req, res){
        const userRole = req.user.role;
        if (!userRole) return res.status(404).json({ error: 'Papel de usuário não informado ou incorreto!' });
        if (userRole == 'admin') {
            try {
                const solicitations = await SolicitationService.getAll();
                return res.json(solicitations);
            } catch (error) {
                return res.status(500).json({ error: error.massage });
            }
        };
        const userId = req.user.id;
        if (!userId) return res.status(404).json({ error: 'Usuário não informado ou não encontrado!' });
        try {
            const solicitations = await SolicitationService.getByUserId(userId);
            return res.status(200).json(solicitations);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    static async getSolicitationById(req, res) {
        const { id } = req.params;
        try{
            const solicitation = await SolicitationService.getSolicitationById(id);
            res.json(solicitation);
        } catch (error) {
            res.status(400).json({ error: error.massage });
        }
    }

    static async createSolicitation(req, res) {
        try{
            const userId = req.user.id;
            if (!userId) return res.status(400).json({ message: 'Usuário não autenticado ou não encontrado!' })
            const { course , subject, period, modality, shift, relation, weekdays, preceptorName, councilRegistration, equipmentId , institutionId } = req.body;
            if ( !course || !subject || !period || !modality || !shift || !relation || !weekdays || !preceptorName || !councilRegistration || !equipmentId || !institutionId ) {
                res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
            }
            const code = await GenerateCode.generateUniqueCode();
            console.log(`codigo: ${code}`);
            if (!code) return res.status(400).json({ message: 'Erro ao gerar o código.' })
            const status = "Em análise";
            const solicitation = await SolicitationService.createSolicitation({ code, course , subject, period, modality, shift, relation, weekdays, preceptorName, councilRegistration, equipmentId, institutionId, userId, status });
            res.status(201).json(solicitation);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async updateSolicitation(req, res) {
        const { id } = req.params;
        const SolicitationToUpdate = await SolicitationService.getSolicitationById(id);
        if (!SolicitationToUpdate) return res.status(404).json({ error: 'Solicitação não encontrado!' });
        try {
            const { course , subject, period, modality, shift, relation, weekdays, preceptorName, councilRegistration, equipmentId, institutionId, userId, status } = req.body;
            if (course) SolicitationToUpdate.course = course;
            if (subject) SolicitationToUpdate.subject = subject;
            if (period) SolicitationToUpdate.period = period;
            if (modality) SolicitationToUpdate.modality = modality;
            if (shift) SolicitationToUpdate.shift = shift;
            if (relation) SolicitationToUpdate.relation = relation;
            if (weekdays) SolicitationToUpdate.weekdays = weekdays; 
            if (preceptorName) SolicitationToUpdate.preceptorName = preceptorName; 
            if (councilRegistration) SolicitationToUpdate.councilRegistration = councilRegistration;
            if (equipmentId) SolicitationToUpdate.equipmentId = equipmentId;
            if (institutionId) SolicitationToUpdate.institutionId = institutionId;
            if (userId) SolicitationToUpdate.institutionId = userId;
            if (status) SolicitationToUpdate.status = status;

            await SolicitationToUpdate.save();
            const solicitation = await SolicitationService.updateSolicitation(id, SolicitationToUpdate);
            res.json(solicitation);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async deleteSolicitation(req, res) {
        const { id } = req.params;
        try {
            await SolicitationService.deleteSolicitation(id);
            res.json({ message: 'Solicitação excluída com sucesso!' })
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = SolicitationController;
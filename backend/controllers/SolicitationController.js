const SolicitationService = require('../services/SolicitationService');
const BookingRepository = require('../repositories/BookingRepository');
const RelationRepository = require('../repositories/RelationRepository');
const UserRepository = require('../repositories/UserRepository');
const GenerateCode = require('../services/GenerateCodeService');

class SolicitationController {

    static async getAllSolicitations(req, res){
        const userRole = req.user.role;
        if (!userRole) return res.status(404).json({ error: 'Papel de usuário não informado ou incorreto!' });
        if (userRole == 'ADMIN') {
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
            return res.json(solicitation);
        } catch (error) {
            return res.status(400).json({ error: error.massage });
        }
    }

    static async createSolicitation(req, res) {
        try{
            const userId = req.user.id;
            if (!userId) return res.status(400).json({ message: 'Usuário não autenticado ou não encontrado!' })
            const { rolePreceptor, course , subject, period, date, 
                    modality, relation, preceptorName, councilRegistration, 
                    equipmentId , departmentId, rotationId } = req.body;
            if ( !date || !rolePreceptor || !course || !subject || !period || 
                !modality || !relation || !preceptorName || !councilRegistration || 
                !equipmentId || !departmentId || !rotationId) {
                return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
            }
            const dataUser = await UserRepository.findById(userId);
            const institutionId = dataUser.institutionId;
            const code = await GenerateCode.generateUniqueCode();
            if (!code) return res.status(400).json({ message: 'Erro ao gerar o código.' })
            const status = "EM ANDAMENTO";
            const justification = null;

            const solicitation = await SolicitationService.createSolicitation({ rolePreceptor, code, course , subject, period, modality, preceptorName, councilRegistration, equipmentId, institutionId, userId, departmentId, rotationId, status, justification });
            
            const solicitationId = solicitation.id;
            
            if (modality === "ESTÁGIO") {
                
                if (Array.isArray(relation)) {
                    
                    for (const item of relation) {
                        const { name, cpf } = item;
    
                        await RelationRepository.create({
                            name,
                            cpf,
                            solicitationId
                        });
    
                        for (const d of date) {
                            await BookingRepository.create({
                                date: d,
                                rotationId,
                                solicitationId
                            });
                        }
                    }
                };
            } else {
                
                if (Array.isArray(relation)) {
                    for (const item of relation) {
                        const { name, cpf } = item;
    
                        await RelationRepository.create({ name, cpf, solicitationId });
                    }
                };

                await BookingRepository.create({date: date[0], rotationId, solicitationId});
            }

            return res.status(201).json(solicitation);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    static async updateSolicitation(req, res) {
        const { id } = req.params;
        const userRole = req.user.role;
        const SolicitationToUpdate = await SolicitationService.getSolicitationById(id);
        if (!SolicitationToUpdate) return res.status(404).json({ error: 'Solicitação não encontrado!' });
        try {
            const { rolePreceptor, course , subject, period, modality, preceptorName, councilRegistration, equipmentId, institutionId, status, justification, departmentId, rotationId } = req.body;
            if (course) SolicitationToUpdate.course = course;
            if (subject) SolicitationToUpdate.subject = subject;
            if (period) SolicitationToUpdate.period = period;
            if (modality) SolicitationToUpdate.modality = modality;
            if (preceptorName) SolicitationToUpdate.preceptorName = preceptorName; 
            if (councilRegistration) SolicitationToUpdate.councilRegistration = councilRegistration;
            if (equipmentId) SolicitationToUpdate.equipmentId = equipmentId;
            if (institutionId) SolicitationToUpdate.institutionId = institutionId;
            if (status) {
                if (status != 'CANCELADO' && userRole != 'ADMIN') return res.status(404).json({ error: 'Usuário não tem acesso para alterar o status da solicitação.' });
                SolicitationToUpdate.status = status;
                SolicitationToUpdate.justification = justification;
            }
            await SolicitationToUpdate.save();
            const solicitation = await SolicitationService.updateSolicitation(id, SolicitationToUpdate);
            return res.json(solicitation);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    static async deleteSolicitation(req, res) {
        const { id } = req.params;
        try {
            await SolicitationService.deleteSolicitation(id);
            return res.json({ message: 'Solicitação excluída com sucesso!' })
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

module.exports = SolicitationController;
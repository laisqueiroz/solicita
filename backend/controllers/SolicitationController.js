const SolicitationService = require('../services/SolicitationService');

class SolicitationController {
    static generatedCodes = new Set();

    static async generateUniqueCode() {
        let code;
        do {
        code = Math.floor(100000 + Math.random() * 900000).toString(); 
        } while (this.generatedCodes.has(code)); 

        this.generatedCodes.add(code); 
        return code;
    }

    static async getAllSolicitations(req, res){
        try {
            const solicitations = await SolicitationService.getAll();
            res.json(solicitations);
        } catch (error) {
            res.status(500).json({ error: error.massage });
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
            const { course , subject, period, modality, shift, relation, weekdays, preceptorName, councilRegistration, equipmentId } = req.body;
            if ( !course || !subject || !period || !modality || !shift || !relation || !weekdays || !preceptorName || !councilRegistration || !equipmentId) {
                res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
            }
            const codeGenerator = this.generateUniqueCode();
            if (!codeGenerator) return res.status(400).json({ message: 'Erro ao gerar o código.' })
            const solicitation = await SolcitationService.createSolicitation({ codeGenerator, course , subject, period, modality, shift, relation, weekdays, preceptorName, councilRegistration, equipmentId });
            res.status(201).json(solicitation);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async updateSolicitation(req, res) {
        const { id } = req.params;
        const SolicitationToUpdate = await SolcitationService.getSolicitationById(id);
        if (!SolcitationToUpdate) return res.status(404).json({ error: 'Solicitação não encontrado!' });
        try {
            const { course , subject, period, modality, shift, relation, weekdays, preceptorName, councilRegistration, equipmentId } = req.body;
            if (course) SolicitationToUpdate.course = course;
            if (subject) SolicitationToUpdate.subject = subject;
            if (period) SolicitationToUpdate.period = period;
            if (modality) SolicitationToUpdate.modality = modality;
            if (shift) SolicitationToUpdate.shift = shift;
            if (relation) SolicitationToUpdate.relation = relation;
            if (weekdays) SolicitationToUpdate.weekdays = weekdays; 
            if (preceptorName) SolicitationToUpdate.preceptorName = preceptorName; 
            if (councilRegistration) SolicitationToUpdate.councilRegistration = councilRegistration;
            if (equipmentId) SolcitationToUpdate.equipmentId = equipmentId;

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
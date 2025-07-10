const { addYears, isAfter } = require('date-fns');
const InstitutionRepository = require('../repositories/InstitutionRepository')

class ValidateDates {

    static async validateStatus () {
        const list = await InstitutionRepository.findByStatus();

        const today = new Date();

        for ( const item of list) {
            const endDate = new Date(item.endDate);

            if(isAfter(today, endDate)) {
                item.status = 'SUSPENSO';

                await item.save();
                console.log(`Instituição ${item.name} atualizada para SUSPENSO`)
            }
        }

        console.log('Verificação de validade finalizada.');
    }

    static async calculateDateAndStatus(dateRegister, validityPeriod) {
        const startDate = new Date(dateRegister);
        const endDate = addYears(startDate, parseInt(validityPeriod));
        const today = new Date();

        const status = isAfter(today, endDate) ? 'SUSPENSO' : 'ATIVO';

        return { endDate, status };
    }
    
}

module.exports = ValidateDates;
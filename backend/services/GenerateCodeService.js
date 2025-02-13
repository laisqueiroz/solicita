const SolicitationService = require("./SolicitationService");

class GenerateCode {
    static async generateUniqueCode() {
        let code;
        let exists;
        do {
        code = Math.floor(100000 + Math.random() * 900000); 
        console.log(code)
        exists = await SolicitationService.getOne(code)
        } while (exists); 

        return code;
    };
};

module.exports = GenerateCode;
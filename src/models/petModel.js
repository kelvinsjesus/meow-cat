var database = require("../database/config")

function template() {
    const statementSQL = `
        SELECT * FROM Pet;
    `;
    console.log("Executando a instrução SQL: \n" + statementSQL);
    return database.executar(statementSQL);
}


module.exports = {
    template
}